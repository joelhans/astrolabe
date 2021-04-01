import { promises as fs } from 'fs'
import glob from 'fast-glob'
import matter from 'gray-matter'
import visit from 'unist-util-visit'
import path from 'path'
import readingTime from 'reading-time'
import renderToString from 'next-mdx-remote/render-to-string'

import MDXComponents from '@components/MDXComponents'
import imgToJsx from './img-to-jsx'

import BananaSlug from 'github-slugger'

const root = process.cwd()

const tokenClassNames = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',
}

export async function getSingleContent(contentPath, slug) {
  const filepath = path.join(root, contentPath, `${slug}.mdx`)
  const source = await fs.readFile(filepath)
  const { content, data } = matter(source)
  const toc = await buildTOC(content)
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        require('remark-autolink-headings'),
        require('remark-code-titles'),
        require('remark-math'),
        imgToJsx,
      ],
      inlineNotes: true,
      rehypePlugins: [
        require('rehype-katex'),
        require('@mapbox/rehype-prism'),
        () => {
          return (tree) => {
            visit(tree, 'element', (node, index, parent) => {
              let [token, type] = node.properties.className || []
              if (token === 'token') {
                node.properties.className = [tokenClassNames[type]]
              }
            })
          }
        },
      ],
    },
  })

  return {
    filepath,
    slug,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
    mdxSource,
    toc,
  }
}

export async function getFrontMatter(source) {
  const files = glob.sync(`${source}/**/*.{md,mdx}`)

  if (!files.length) return []

  const allFrontMatter = await Promise.all(
    files.map(async (filepath) => {
      const slug = filepath
        .replace(source, '')
        .replace(/^\/+/, '')
        .replace(new RegExp(path.extname(filepath) + '$'), '')

      const mdSource = await fs.readFile(filepath)
      const { data } = matter(mdSource)

      return {
        ...data,
        slug: slug,
      }
    })
  )

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
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

export async function getContent(source, slug) {
  // console.log(slug)

  const files = glob.sync(`${source}/**/*.{md,mdx}`)

  if (!files.length) return []

  const content = await Promise.all(
    files.map(async (filepath) => {
      const slug = filepath
        .replace(source, '')
        .replace(/^\/+/, '')
        .replace(new RegExp(path.extname(filepath) + '$'), '')

      const mdSource = await fs.readFile(filepath)
      const { content, data } = matter(mdSource)
      const md = await renderToString(content, {
        components: MDXComponents,
        mdxOptions: {
          remarkPlugins: [
            require('remark-slug'),
            require('remark-autolink-headings'),
            require('remark-code-titles'),
            require('remark-math'),
            imgToJsx,
          ],
          inlineNotes: true,
          rehypePlugins: [
            require('rehype-katex'),
            require('@mapbox/rehype-prism'),
            () => {
              return (tree) => {
                visit(tree, 'element', (node, index, parent) => {
                  let [token, type] = node.properties.className || []
                  if (token === 'token') {
                    node.properties.className = [tokenClassNames[type]]
                  }
                })
              }
            },
          ],
        },
      })

      // console.log(md)

      const toc = await buildTOC(content)

      return {
        filepath,
        slug,
        content,
        data,
        md,
        toc,
      }
    })
  )
  return content
}

export async function getFiles(type) {
  return glob.sync(`${root}/content/${type}/**/*.{md,mdx}`)
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function stripSlug(slug, type) {
  return slug.split(path.join(root, 'content', type, '/'))[1]
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, 'content', type, `${slug}.mdx`)
  const mdPath = path.join(root, 'content', type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        require('remark-autolink-headings'),
        require('remark-code-titles'),
        require('remark-math'),
        imgToJsx,
      ],
      inlineNotes: true,
      rehypePlugins: [
        require('rehype-katex'),
        require('@mapbox/rehype-prism'),
        () => {
          return (tree) => {
            visit(tree, 'element', (node, index, parent) => {
              let [token, type] = node.properties.className || []
              if (token === 'token') {
                node.properties.className = [tokenClassNames[type]]
              }
            })
          }
        },
      ],
    },
  })

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter(type) {
  const contentGlob = `${root}/content/${type}/**/*.{md,mdx}`
  const files = glob.sync(contentGlob)

  const allFrontMatter = []

  files.forEach((file) => {
    const source = fs.readFileSync(file, 'utf8')
    const { data } = matter(source)

    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: stripSlug(formatSlug(file), type) })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
