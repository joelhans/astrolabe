import { useEffect } from 'react'
import { BASE_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import { getSingleContent } from '@lib/mdx'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageTitle from '@components/PageTitle'
import { PageSEO } from '@components/SEO'

export async function getStaticProps() {
  const content = await getSingleContent(BASE_CONTENT_PATH, 'submissions')
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
      <header className="flex flex-row flex-wrap md:space-x-6 md:flex-nowrap mt-48">
        <PageTitle>Submissions</PageTitle>
      </header>
      <div className="flex flex-row flex-wrap items-start mt-32 mb-48">
        <div className="meta-content prose prose-lg lg:prose-2xl">
          <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
        </div>
      </div>
    </>
  )
}
