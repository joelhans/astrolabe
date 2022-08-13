import siteMetadata from '@data/siteMetadata'
import { WORK_CONTENT_PATH } from '@config/constants'
import { getFrontMatter } from '@lib/mdx'
import { PageSEO } from '@components/SEO'
import Universe from '@components/Universe'
import dynamic from 'next/dynamic'

export async function getStaticProps() {
  const posts = await getFrontMatter(WORK_CONTENT_PATH, true)
  return { props: { posts } }
}

// const DynamicComponentWithNoSSR = dynamic(() => import('@components/Universe'), { ssr: false })

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Universe posts={posts} />
      {/* <DynamicComponentWithNoSSR posts={posts} /> */}
    </>
  )
}
