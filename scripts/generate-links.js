import fs from 'fs'
import { promises as fsp } from 'fs'
import glob from 'fast-glob'
import path from 'path'
import { visit } from 'unist-util-visit'
import { bundleMDX } from 'mdx-bundler'// const { serialize } = require('next-mdx-remote/serialize')

;(async () => {
  const files = glob.sync(`./content/articles/**/*.{md,mdx}`)
  if (!files.length) return false

  let Links = []
  await Promise.all(
    files.map(async (filepath) => {
      const source = await fsp.readFile(filepath)
      const { frontmatter, code } = await bundleMDX(source, {
        cwd: path.join(process.cwd(), 'src/components'),
        xdmOptions(options) {
          // this is the recommended way to add custom remark/rehype plugins:
          // The syntax might look weird, but it protects you in case we add/remove
          // plugins in the future.
          options.remarkPlugins = [
            ...(options.remarkPlugins ?? []),
          ]
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            // require('rehype-katex'),
            // [require('rehype-prism-plus'), { ignoreMissing: true }],
            () => {
              return (tree) => {
                visit(tree, 'element', (node, index, parent) => {
                  console.log(parent)
                   if (node.tagName === 'a' && node.properties.href.startsWith('/')) {
                    // Clean up the source to link back to it.
                    const sourceSlug = filepath.replace('.mdx', '').replace('./content/articles', '')
                    const dest = node.properties.href
                    // console.log(cwd)
                    Links.push({
                      dest: dest,
                      sourceSlug: sourceSlug,
                      // sourceTitle: frontmatter.title,
                    })
                   }
                })
              }
            },
          ]
          return options
        },
        esbuildOptions: (options) => {
          options.loader = {
            ...options.loader,
            '.js': 'jsx',
          }
          return options
        },
      })


      console.log(frontmatter)

      // const mdSource = await fsp.readFile(filepath)
      // const { content, data } = matter(mdSource)
      // await serialize(content, {
      //   mdxOptions: {
      //     scope: data,
      //     rehypePlugins: [
      //       () => {
      //         return (tree) => {
      //           visit(tree, 'element', (node, index, parent) => {
      //             if (node.tagName === 'a' && node.properties.href.startsWith('/')) {
      //               // Clean up the source to link back to it.
      //               const sourceSlug = filepath.replace('.mdx', '')
      //               const dest = node.properties.href
      //               Links.push({
      //                 dest: dest,
      //                 sourceSlug: sourceSlug,
      //                 sourceTitle: data.title,
      //               })
      //             }
      //           })
      //         }
      //       },
      //     ],
      //   },
      // })
    })
  )

  fs.writeFileSync('./src/data/links.json', JSON.stringify(Links, null, 1))
})()

// const path = require('path')
// const glob = require('fast-glob')
// const fs = require('fs')

// ;(async () => {
//   const IntegrationFiles = glob.sync([
//     './docs/agent/collectors/go.d.plugin/modules/*.{md,mdx}',
//     './docs/agent/collectors/python.d.plugin/*.{md,mdx}',
//     './docs/agent/collectors/node.d.plugin/*.{md,mdx}',
//     './docs/agent/collectors/charts.d.plugin/*.{md,mdx}',
//     './docs/agent/collectors/stats.d.plugin/*.{md,mdx}',
//     './docs/agent/collectors/!(quickstart)!(reference)!(python.d)!(collectors)!(charts.d)(!go.d.plugin)*.{md,mdx}',
//     './docs/agent/health/notifications/*.{md,mdx}',
//     './docs/agent/exporting/**/!(timescale)!(walkthrough)*.{md,mdx}'
//   ])

//   const Integrations = await Promise.all(
//     IntegrationFiles.map(async (filepath) => {
//       const provider = fs.readFileSync(filepath, 'utf8')
//       const { title, description } = provider.match(/title: (?<title>.+)\n/).groups
//       const type = filepath.split('agent/')[1].split('/')[0].replace('collectors', 'collector').replace('health', 'notification')

//       return {
//         title: title.replace(/"/g, '').replace(' monitoring with Netdata', '').replace('Send notifications to', '').replace('Send Netdata notifications to ', '').replace('Export metrics to', ''),
//         slug: filepath.split('.md')[0],
//         type
//       }
//     }
//   ))

//   fs.writeFileSync('./src/data/Integrations.json', JSON.stringify(Integrations, null, 1))

// })()
