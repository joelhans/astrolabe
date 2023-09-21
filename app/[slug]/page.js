import { STAR_CONTENT_PATH, CATACLYSM } from '@config/constants'
import { getSingleContent, getFrontMatter } from '@lib/mdx'
import StarLayout from '@/layouts/StarLayout'

export async function getStar(slug) {
  const star = await getSingleContent(STAR_CONTENT_PATH, slug)
  return star
}

export async function gatherFrontMatter() {
  const posts = await getFrontMatter(STAR_CONTENT_PATH, true)
  return posts
}

export async function generateMetadata({ params: { slug } }) {
  const { frontMatter } = await getSingleContent(STAR_CONTENT_PATH, slug)
  return {
    // NEED TO CLEAN THE TITLES OF TAGS
    title: frontMatter.title,
    description: frontMatter.summary,
    // MORE SEO TO COME
  }
}

export default async function Star({ params: { slug } }) {
  const star = await getStar(slug)
  const posts = await gatherFrontMatter()

  return (
    <>
      <StarLayout star={star} posts={posts} />
    </>
  )
}
