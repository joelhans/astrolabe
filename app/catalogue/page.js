import { STAR_CONTENT_PATH, BASE_CONTENT_PATH } from '@config/constants'
import { getFrontMatter, getSingleContent } from '@lib/mdx'
import CatalogueLayout from '@/layouts/CatalogueLayout'

async function getStars() {
  const posts = await getFrontMatter(STAR_CONTENT_PATH, true)
  return posts
}

async function getCatalogueContent() {
  const content = await getSingleContent(BASE_CONTENT_PATH, 'catalogue')
  return content
}

export async function generateMetadata() {
  const { frontMatter } = await getCatalogueContent()
  return {
    title: frontMatter.title,
    description: frontMatter.summary,
  }
}

export default async function Catalogue() {
  const { mdxSource, frontMatter } = await getCatalogueContent()
  const posts = await getStars()

  return <CatalogueLayout mdxSource={mdxSource} frontMatter={frontMatter} posts={posts} />
}
