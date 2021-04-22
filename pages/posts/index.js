import siteMetadata from '@data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@components/SEO'
import { getFrontMatter } from '@/lib/mdx'
import { POSTS_CONTENT_PATH } from '@config/constants'

export async function getStaticProps() {
  const posts = await getFrontMatter(POSTS_CONTENT_PATH)
  return { props: { posts } }
}

export default function Posts({ posts }) {
  return (
    <>
      <PageSeo
        title={`Posts`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/posts`}
      />
      <ListLayout posts={posts} title="Posts" />
    </>
  )
}
