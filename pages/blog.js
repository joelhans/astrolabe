import { getFrontMatter } from '@/lib/mdx'
import { BLOG_CONTENT_PATH } from '@config/constants';
import siteMetadata from '@data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@components/SEO'

export async function getStaticProps() {
  const posts = await getFrontMatter(BLOG_CONTENT_PATH)
  return { props: { posts } }
}

export default function Blog({ posts }) {
  return (
    <>
      <PageSeo
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <ListLayout posts={posts} title="All Posts" />
    </>
  )
}
