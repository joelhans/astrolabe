import fs from 'fs'
import { promises as fsp } from 'fs'
import glob from 'fast-glob'
import { visit } from 'unist-util-visit'
import { bundleMDX } from 'mdx-bundler'
import matter from 'gray-matter'

;(async () => {
  const files = glob.sync(`./content/articles/**/*.{md,mdx}`)
  if (!files.length) return false

  let Links = new Array
  await Promise.all(
    files.map(async (filepath) => {
      const source = await fsp.readFile(filepath)
      await bundleMDX(source, {
        xdmOptions(options) {
          options.rehypePlugins = [
            () => {
              return (tree, file) => {
                visit(tree, 'element', (node, index, parent) => {
                  // Only look for `a` elements that begin with `/`, as that
                  // _should_ indicate that we're working with an internal link
                  // between two posts.
                  if (node.tagName === 'a' && node.properties.href.startsWith('/')) {

                    // Get the text of the parent element as best as possible.
                    console.log(parent)
                    const parentText = parent.children.map((child) => {
                      let string
                      const safes = ['a', 'em', 'strong', 'code']

                      // Text children, which are the easiest to get the value from.
                      if ( child.type === 'text' && child.value.length > 0 ) {
                        string = child.value
                      }
                      
                      // "safe" children, which reliably have a single `text`
                      // child of their own, which means we can easily grab the
                      // first item in the `children` array and pass along its
                      // `value`.
                      else if ( safes.includes(child.tagName) && child.children[0].value.length > 0 ) {
                        string = child.children[0].value
                      }

                      // Provide a weird-looking result for anything that isn't
                      // matched above so that we can identify better ways to
                      // get all the parent text cleanly.
                      else {
                        string = '~~~'
                      }

                      return string
                    })

                    // Push to the `Links` array.
                    const link = {
                      dest: node.properties.href,
                      source: filepath,
                      title: matter(source).data.title,
                      parentText: parentText.join('')
                    }
                    Links.push(link)
                  }
                })
              }
            },
          ]
          return options
        }
      })
    })
  )

  // Write the `Links` to a JSON file to be loaded as data and rendered.
  fs.writeFileSync('./src/data/links.json', JSON.stringify(Links, null, 1))
})()
