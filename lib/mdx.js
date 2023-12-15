import { promises as fsp } from 'fs'
import fg from 'fast-glob'
import matter from 'gray-matter'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import rehypeSlug from 'rehype-slug'
import { notFound } from 'next/navigation'

const root = process.cwd()

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getSingleContent(slug) {
  // This is messy, but it works. Catch whether the `filepath` exists. If it
  // does, return the MDX content as normal. If it doesn't throw a `notFound()`
  // to then display a 404 without rendering the rest of the page.
  try {
    const filepath = await fg.glob(`${root}/**/${slug}.mdx`, { baseNameMatch: true })

    const { frontmatter, code } = await bundleMDX({
      file: filepath.toString(),
      cwd: path.join(process.cwd(), 'src/components'),
      mdxOptions(options) {
        options.remarkPlugins = [...(options.remarkPlugins ?? [])]
        options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug]
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

    // Parse the authorBio field if it exists, which often has Markdown of its own.
    const authorBioCode = frontmatter.authorBio ? (await bundleMDX({ source: frontmatter.authorBio })).code : ('')

    return {
      mdxSource: code,
      frontMatter: {
        slug: slug || null,
        id: slug || null,
        authorBioMdx: authorBioCode,
        ...frontmatter,
      },
    }
  } catch (error) {
    notFound()
  }
}

export async function getFrontMatter(...source) {
  const files = await fg.glob(source)
  if (!files.length) return []

  const allFrontMatter = await Promise.all(
    files.map(async (filepath) => {
      const slug = filepath
        .replace(source, '')
        .replace('stars', '')
        .replace(/^\/+/, '')
        .split('/')
        .pop() // Remove extra folder.
        .replace(new RegExp(path.extname(filepath) + '$'), '')

      const mdSource = await fsp.readFile(filepath)
      const { data } = matter(mdSource)
      return {
        ...data,
        slug: slug,
        id: slug,
      }
    })
  )

  // Use `.filter` here to get rid of any `{}` returned above. This means that
  // they're drafts, and shouldn't be returned to `getStaticProps`.
  return allFrontMatter
    .filter((value) => JSON.stringify(value) !== '{}')
    .sort((a, b) => dateSortDesc(a.publishedOn, b.publishedOn))
}
