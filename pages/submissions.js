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

  return (
    <>
      <PageSEO
        title={`${frontMatter.title} • ${siteMetadata.title}`}
        description={siteMetadata.description}
      />
      <main className="max-w-screen-lg mx-auto mb-auto px-6">
        <header className="flex flex-row flex-wrap md:space-x-6 md:flex-nowrap mt-48">
          <PageTitle>Submissions</PageTitle>
        </header>
        <div className="flex flex-row flex-wrap items-start mt-16">
          <div className="prose prose-lg lg:prose-2xl mb-24">
            <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
          </div>
        </div>
      </main>
    </>
  )
}
