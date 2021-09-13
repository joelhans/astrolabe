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
        title={`Updates & articles`}
        description={`Updates about my work and thoughts about fiction, copywriting, or technical writing.`}
        url={`${siteMetadata.siteUrl}/articles`}
      />
      <ListLayout posts={posts} title="Updates &amp; articles" />
    </>
  )
}
