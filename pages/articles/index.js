import siteMetadata from '@data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@components/SEO'
import { getFrontMatter } from '@/lib/mdx'
import { ARTICLES_CONTENT_PATH } from '@config/constants'
import ConvertKit from '@components/ConvertKit'

export async function getStaticProps() {
  const posts = await getFrontMatter(ARTICLES_CONTENT_PATH, true)
  return { props: { posts } }
}

export default function Posts({ posts }) {
  return (
    <>
      <PageSeo
        title={`Articles`}
        description={`My articles about writing on the web, at the intersection between fiction, technical writing, documentation, and the development tools you'll need to to be successful in whichever path you choose.`}
        url={`${siteMetadata.siteUrl}/articles`}
      />
      <ListLayout posts={posts} title="Articles" />
      <ConvertKit />
    </>
  )
}
