import { promises as fs } from 'fs'
import glob from 'fast-glob'
import matter from 'gray-matter'
import { kebabCase } from './utils'

export async function getAllTags(source) {
  const files = glob.sync(`${source}/**/*.{md,mdx}`)

  if (!files.length) return []

  let tagCount = {}
  await Promise.all(
    files.map(async (filepath) => {
      const source = await fs.readFile(filepath)
      const { data } = matter(source)

      if (data.tags && data.draft !== true) {
        data.tags.forEach((tag) => {
          const formattedTag = kebabCase(tag)
          if (formattedTag in tagCount) {
            tagCount[formattedTag] += 1
          } else {
            tagCount[formattedTag] = 1
          }
        })
      }
    })
  )

  return tagCount
}
