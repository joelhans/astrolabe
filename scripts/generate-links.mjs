import fs from 'fs'
import glob from 'fast-glob'
import { visit } from 'unist-util-visit'
import { bundleMDX } from 'mdx-bundler'
import matter from 'gray-matter'

const root = process.cwd()

;(async () => {
  const files = glob.sync(`${root}/content/articles/**/*.{md,mdx}`)
  if (!files.length) return false

  let Links = new Array()
  await Promise.all(
    files.map(async (filepath) => {
      const source = await fs.readFileSync(filepath)
      await bundleMDX({
        file: filepath,
        xdmOptions(options) {
          options.rehypePlugins = [
            () => {
              return (tree, file) => {
                visit(tree, 'element', (node, index, parent) => {
                  // Only look for `a` elements that begin with `/`, as that
                  // _should_ indicate that we're working with an internal link
                  // between two posts.
                  if (node.tagName === 'a' && node.properties.href.startsWith('/')) {
                    // Get the text of the parent element as best as possible,
                    // then mapping through each of its children to concatenate
                    // their values.
                    const text = parent.children.map((child) => {
                      let values
                      const safes = ['em', 'strong', 'code']

                      // Text children, which are the easiest to get the value from.
                      if (child.type === 'text') {
                        values = child.value
                      }

                      // Link children, which we want to capture and bold-ify.
                      else if (
                        child.tagName === 'a' &&
                        child.children[0].value.length > 0
                      ) {
                        values = `<strong>${child.children[0].value}</strong>`
                      }

                      // "safe" children, which reliably have a single `text`
                      // child of their own, which means we can easily grab the
                      // first item in the `children` array and pass along its
                      // `value`.
                      else if (
                        safes.includes(child.tagName) &&
                        child.children[0].value.length > 0
                      ) {
                        values = child.children[0].value
                      }

                      // Provide a weird-looking result for anything that isn't
                      // matched above so that we can identify better ways to
                      // get all the parent text cleanly.
                      else {
                        values = '~~~'
                      }

                      return values
                    })

                    // Push to the `Links` array.
                    const link = {
                      dest: node.properties.href,
                      src: filepath.replace(`${root}`, '').replace('content/', '').replace(/.(md|mdx)$/, ''),
                      title: matter(source).data.title,
                      text: text.join(''),
                    }
                    Links.push(link)
                  }
                })
              }
            },
          ]
          return options
        },
      })
    })
  )

  // Write `Links` to a JSON file to be loaded as data and rendered.
  fs.writeFileSync('./src/data/linkData.json', JSON.stringify(Links, null, 1))
})()
