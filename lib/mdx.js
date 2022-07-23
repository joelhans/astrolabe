import { promises as fsp } from 'fs'
import glob from 'fast-glob'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { bundleMDX } from 'mdx-bundler'
import remarkSlug from 'remark-slug'
import remarkAutolinkHeadings from 'remark-autolink-headings'
import remarkImgToJsx from './img-to-jsx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const root = process.cwd()

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getSingleContent(contentPath, slug) {
  const filepath = path.join(root, contentPath, `${slug}.mdx`)
  const source = await fsp.readFile(filepath)

  const { frontmatter, code } = await bundleMDX({
    file: filepath,
    cwd: path.join(process.cwd(), 'src/components'),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkSlug,
        remarkAutolinkHeadings,
        remarkImgToJsx,
        remarkMath,
      ]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex]
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

  return {
    mdxSource: code,
    // toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      id: slug || null,
      ...frontmatter,
    },
  }
}

export async function getFrontMatter(source, filterDrafts) {
  const files = glob.sync(`${source}/**/*.{md,mdx}`)
  if (!files.length) return []

  const allFrontMatter = await Promise.all(
    files.map(async (filepath) => {
      const slug = filepath
        .replace(source, '')
        .replace(/^\/+/, '')
        .replace(new RegExp(path.extname(filepath) + '$'), '')

      const mdSource = await fsp.readFile(filepath)
      const { data } = matter(mdSource)

      // return {
      //   ...data,
      //   slug: slug,
      // }

      // Pass through data and slug if the article is not a draft and we do want
      // to filter drafts, or the article is not a draft and we do want to
      // filter them.
      if (data.draft !== true) {
        return {
          ...data,
          slug: slug,
          id: slug,
        }
      } else {
        return {}
      }
    })
  )

  // Use `.filter` here to get rid of any `{}` returned above. This means that
  // they're drafts, and shouldn't be returned to `getStaticProps`.
  return allFrontMatter
    .filter((value) => JSON.stringify(value) !== '{}')
    .sort((a, b) => dateSortDesc(a.publishedOn, b.publishedOn))
}
