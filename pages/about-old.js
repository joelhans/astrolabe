import { useEffect } from 'react'
import { BASE_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import { getSingleContent } from '@lib/mdx'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageHeader from '@components/PageHeader'
import PageBody from '@components/PageBody'
import PageFooter from '@components/PageFooter'
import { PageSEO } from '@components/SEO'

export async function getStaticProps() {
  const content = await getSingleContent(BASE_CONTENT_PATH, 'about')
  return { props: { content } }
}

export default function About({ content }) {
  const { mdxSource, frontMatter } = content

  // Force overflow so we can scroll on this page.
  useEffect(() => {
    document.body.style.overflow = 'auto'
  })

  return (
    <>
      <PageSEO
        title={`${frontMatter.title} • ${siteMetadata.title}`}
        description={siteMetadata.description}
      />
      <PageHeader title={frontMatter.title} />
      <PageBody>
        <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
      </PageBody>
    </>
  )
}
