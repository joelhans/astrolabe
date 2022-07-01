import Image from 'next/image'
import { getSingleContent } from '@/lib/mdx'
import { PageSeo } from '@components/SEO'
import { BASE_CONTENT_PATH } from '@config/constants'
import PageTitle from '@components/PageTitle'
import siteMetadata from '@data/siteMetadata'
import { MDXLayoutRenderer } from '@components/MDXComponents'

export async function getStaticProps() {
  const content = await getSingleContent(BASE_CONTENT_PATH, 'about')
  return { props: { content } }
}

export default function About({ content }) {
  const { mdxSource, frontMatter } = content

  return (
    <>
      <PageSeo
        title={frontMatter.title}
        description={frontMatter.summary}
        url={`${siteMetadata.siteUrl}/${frontMatter.slug}`}
      />
      <header className="flex flex-row flex-wrap md:space-x-6 md:flex-nowrap mt-24">
        <PageTitle>Who am I?</PageTitle>
      </header>
      <div className="flex flex-row flex-wrap items-start mt-6">
        <div className="prose prose-md lg:prose-lg dark:prose-dark mb-24">
          <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
          <div className="mt-8">
            <Image
              width={2000}
              height={1500}
              src="/static/images/me-girls.jpeg"
              className="rounded !mt-8"
              alt="Joel Hans and his daughters"
            />
            <p className="!-mt-2">Me and my daughters. Mt. Lemmon, Arizona. Nov 8, 2021.</p>
          </div>
        </div>
      </div>
    </>
  )
}
