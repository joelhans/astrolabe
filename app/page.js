import siteMetadata from '@data/siteMetadata'
import { BASE_CONTENT_PATH, STAR_CONTENT_PATH } from '@config/constants'
import { getFrontMatter } from '@lib/mdx'
import Universe from '@components/Universe'

export const metadata = {
  title: siteMetadata.title,
}

async function getStars() {
  const posts = await getFrontMatter(BASE_CONTENT_PATH, STAR_CONTENT_PATH)
  return posts
}

export default async function Home() {
  const posts = await getStars()

  return (
    <>
      <Universe posts={posts} />
    </>
  )
}
