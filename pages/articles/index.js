import siteMetadata from '@data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@components/SEO'
import { getFrontMatter } from '@/lib/mdx'
import { ARTICLES_CONTENT_PATH } from '@config/constants'

export async function getStaticProps() {
  const posts = await getFrontMatter(ARTICLES_CONTENT_PATH, true)
  return { props: { posts } }
}

export default function Posts({ posts }) {
  return (
    <>
      <PageSeo
        title={`Articles`}
        description={`Updates about my work and thoughts about copywriting, open-source, and any of the other disguises I wear from time to time.`}
        url={`${siteMetadata.siteUrl}/articles`}
      />
      <ListLayout
        posts={posts}
        title="Articles"
        summary="Updates about my work and thoughts about copywriting, open-source, and any of the other disguises I wear from time to time."
      />
    </>
  )
}
