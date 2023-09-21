import { promises as fsp } from 'fs'
import glob from 'fast-glob'
import matter from 'gray-matter'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import remarkImgToJsx from './img-to-jsx'
import rehypeSlug from 'rehype-slug'

const root = process.cwd()

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getSingleContent(contentPath, slug) {
  const filepath = path.join(root, contentPath, `${slug}.mdx`)
  let authorBioCode

  const { frontmatter, code } = await bundleMDX({
    file: filepath,
    cwd: path.join(process.cwd(), 'src/components'),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkImgToJsx]
      options.rehypePlugins = [...(options.rehypePlugins ?? [rehypeSlug])]
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

  // let authorBioCode
  // if (frontmatter.authorBio) {
  //   {authorBioCode = await bundleMDX({
  //     source: frontmatter.authorBio,
  //   })
  // }

  // // console.log(authorBioCode)

  // const authorBioCode =

  if (frontmatter.authorBio) {
    const authorBioMdx = await bundleMDX({
      source: frontmatter.authorBio,
    })
    authorBioCode = authorBioMdx.code
  }

  // console.log(authorBioCode)

  return {
    mdxSource: code,
    frontMatter: {
      slug: slug || null,
      id: slug || null,
      authorBioMdx: authorBioCode || null,
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
        .replace('stars', '')
        .replace(/^\/+/, '')
        .replace(new RegExp(path.extname(filepath) + '$'), '')

      const mdSource = await fsp.readFile(filepath)
      const { data } = matter(mdSource)

      // Filter out drafts in areas like the Universe or Catalogue, but keep
      // them at their (hidden) URL for preview's sake.
      if (filterDrafts === true && data.draft === true) {
        return {}
      } else {
        return {
          ...data,
          slug: slug,
          id: slug,
        }
      }
    })
  )

  // console.log(allFrontMatter)

  // Use `.filter` here to get rid of any `{}` returned above. This means that
  // they're drafts, and shouldn't be returned to `getStaticProps`.
  return allFrontMatter
    .filter((value) => JSON.stringify(value) !== '{}')
    .sort((a, b) => dateSortDesc(a.publishedOn, b.publishedOn))
}
