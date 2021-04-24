import fs from 'fs'
import { promises as fsp } from 'fs'
import glob from 'fast-glob'
import matter from 'gray-matter'
// import visit from 'unist-util-visit'
import path from 'path'
import readingTime from 'reading-time'
import renderToString from 'next-mdx-remote/render-to-string'

import MDXComponents from '@components/MDXComponents'
import imgToJsx from './img-to-jsx'
// import codeblock from './codeblock'

import BananaSlug from 'github-slugger'

const root = process.cwd()

// const tokenClassNames = {
//   tag: 'text-code-red',
//   'attr-name': 'text-code-yellow',
//   'attr-value': 'text-code-green',
//   deleted: 'text-code-red',
//   inserted: 'text-code-green',
//   punctuation: 'text-code-white',
//   keyword: 'text-code-purple',
//   string: 'text-code-green',
//   function: 'text-code-blue',
//   boolean: 'text-code-red',
//   comment: 'text-gray-400 italic',
// }

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getSingleContent(contentPath, slug) {
  const filepath = path.join(root, contentPath, `${slug}.mdx`)
  const source = await fsp.readFile(filepath)
  const stat = fs.statSync(filepath).mtime
  const { content, data } = matter(source)
  const toc = await buildTOC(content)
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [require('remark-slug'), require('remark-autolink-headings'), imgToJsx],
      inlineNotes: true,
      rehypePlugins: [],
    },
  })

  return {
    filepath,
    slug,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      lastmod: JSON.parse(JSON.stringify(stat)),
      ...data,
    },
    mdxSource,
    toc,
  }
}

export async function getFrontMatter(source, filterDrafts) {
  const files = glob.sync(`${source}/**/*.{md,mdx}`)

  // console.log(filterDrafts)

  if (!files.length) return []

  const allFrontMatter = await Promise.all(
    files.map(async (filepath) => {
      const slug = filepath
        .replace(source, '')
        .replace(/^\/+/, '')
        .replace(new RegExp(path.extname(filepath) + '$'), '')

      const mdSource = await fsp.readFile(filepath)
      const { data } = matter(mdSource)

      // I'm not sure why, but I can't get the drafts working. I just need to launch.
      if (data.draft !== true) {
        return {
          ...data,
          slug: slug,
        }
      } else {
        return {}
      }

      // if (data.draft !== true && (filterDrafts !== false || filterDrafts == null)) {
      //   console.log('hi')
      //   return {
      //     ...data,
      //     slug: slug,
      //   }
      // } else if (data.draft === true && (filterDrafts === false || filterDrafts == null)) {
      //   console.log('hello')
      //   return {
      //     ...data,
      //     slug: slug,
      //   }
      // } else {
      //   console.log('fail')
      //   return {}
      // }
    })
  )

  // Use `.filter` here to get rid of any `{}` returned above. This means that
  // they're drafts, and shouldn't be returned to `getStaticProps`.
  return allFrontMatter
    .filter((value) => JSON.stringify(value) !== '{}')
    .sort((a, b) => dateSortDesc(a.date, b.date))
}

export async function buildTOC(source) {
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source.split('\n').filter((line) => {
    return line.match(/^###*\s/)
  })

  const headings = await Promise.all(
    headingLines.map((raw) => {
      const text = raw.replace(/^###*\s/, '')
      // I only care about h2 and h3.
      // If I wanted more levels, I'd need to count the
      // number of #s.
      const level = raw.slice(0, 3) === '###' ? 3 : 2
      const hash = `#${BananaSlug.slug(text)}`

      return { text, level, hash }
    })
  )

  return headings
}

// OLD FUNCTIONS BELOW

// export async function getContent(source, slug) {
//   const files = glob.sync(`${source}/**/*.{md,mdx}`)

//   if (!files.length) return []

//   const content = await Promise.all(
//     files.map(async (filepath) => {
//       const slug = filepath
//         .replace(source, '')
//         .replace(/^\/+/, '')
//         .replace(new RegExp(path.extname(filepath) + '$'), '')

//       const mdSource = await fsp.readFile(filepath)
//       const { content, data } = matter(mdSource)
//       const md = await renderToString(content, {
//         components: MDXComponents,
//         mdxOptions: {
//           remarkPlugins: [
//             require('remark-slug'),
//             require('remark-autolink-headings'),
//             require('remark-code-titles'),
//             require('remark-math'),
//             imgToJsx,
//           ],
//           inlineNotes: true,
//           rehypePlugins: [
//             require('rehype-katex'),
//             require('@mapbox/rehype-prism'),
//             () => {
//               return (tree) => {
//                 visit(tree, 'element', (node, index, parent) => {
//                   let [token, type] = node.properties.className || []
//                   if (token === 'token') {
//                     node.properties.className = [tokenClassNames[type]]
//                   }
//                 })
//               }
//             },
//           ],
//         },
//       })

//       const toc = await buildTOC(content)

//       return {
//         filepath,
//         slug,
//         content,
//         data,
//         md,
//         toc,
//       }
//     })
//   )
//   return content
// }

// export async function getFiles(type) {
//   return glob.sync(`${root}/content/${type}/**/*.{md,mdx}`)
// }

// export function formatSlug(slug) {
//   return slug.replace(/\.(mdx|md)/, '')
// }

// export function stripSlug(slug, type) {
//   return slug.split(path.join(root, 'content', type, '/'))[1]
// }

// export function dateSortDesc(a, b) {
//   if (a > b) return -1
//   if (a < b) return 1
//   return 0
// }

// export async function getFileBySlug(type, slug) {
//   const mdxPath = path.join(root, 'content', type, `${slug}.mdx`)
//   const mdPath = path.join(root, 'content', type, `${slug}.md`)
//   const source = fsp.existsSync(mdxPath)
//     ? fsp.readFileSync(mdxPath, 'utf8')
//     : fsp.readFileSync(mdPath, 'utf8')

//   const { data, content } = matter(source)
//   const mdxSource = await renderToString(content, {
//     components: MDXComponents,
//     mdxOptions: {
//       remarkPlugins: [
//         require('remark-slug'),
//         require('remark-autolink-headings'),
//         require('remark-code-titles'),
//         require('remark-math'),
//         imgToJsx,
//       ],
//       inlineNotes: true,
//       rehypePlugins: [
//         require('rehype-katex'),
//         require('@mapbox/rehype-prism'),
//         () => {
//           return (tree) => {
//             visit(tree, 'element', (node, index, parent) => {
//               let [token, type] = node.properties.className || []
//               if (token === 'token') {
//                 node.properties.className = [tokenClassNames[type]]
//               }
//             })
//           }
//         },
//       ],
//     },
//   })

//   return {
//     mdxSource,
//     frontMatter: {
//       wordCount: content.split(/\s+/gu).length,
//       readingTime: readingTime(content),
//       slug: slug || null,
//       fileName: fsp.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
//       ...data,
//     },
//   }
// }

// export async function getAllFilesFrontMatter(type) {
//   const contentGlob = `${root}/content/${type}/**/*.{md,mdx}`
//   const files = glob.sync(contentGlob)

//   const allFrontMatter = []

//   files.forEach((file) => {
//     const source = fsp.readFileSync(file, 'utf8')
//     const { data } = matter(source)

//     if (data.draft !== true) {
//       allFrontMatter.push({ ...data, slug: stripSlug(formatSlug(file), type) })
//     }
//   })

//   return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
// }
