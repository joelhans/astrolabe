import { getFrontMatter } from './mdx'
import kebabCase from './utils/kebabCase'
import { ARTICLES_CONTENT_PATH } from '@config/constants'

export async function getAllTags() {
  const files = await getFrontMatter(ARTICLES_CONTENT_PATH, true)

  let tagCount = {}
  files.forEach((data) => {
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

  return tagCount
}
