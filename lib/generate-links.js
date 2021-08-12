const fs = require('fs')
const fsp = require('fs/promises')
const glob = require('fast-glob')
const matter = require('gray-matter')
const visit = require('unist-util-visit')
const { serialize } = require('next-mdx-remote/serialize')

;(async () => {
  const files = glob.sync(`./content/articles/**/*.{md,mdx}`)
  if (!files.length) return false

  let Links = []
  await Promise.all(
    files.map(async (filepath) => {
      const mdSource = await fsp.readFile(filepath)
      const { content, data } = matter(mdSource)
      await serialize(content, {
        mdxOptions: {
          scope: data,
          rehypePlugins: [
            () => {
              return (tree) => {
                visit(tree, 'element', (node, index, parent) => {
                  if (node.tagName === 'a' && node.properties.href.startsWith('/')) {
                    // Clean up the source to link back to it.
                    const sourceSlug = filepath.replace('.mdx', '')
                    const dest = node.properties.href
                    Links.push({
                      dest: dest,
                      sourceSlug: sourceSlug,
                      sourceTitle: data.title,
                    })
                  }
                })
              }
            },
          ],
        },
      })
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
