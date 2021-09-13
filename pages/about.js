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
        <div>
          <PageTitle>Who am I?</PageTitle>
        </div>
      </header>
      <div className="flex flex-row flex-nowrap items-start">
        <div className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark mb-24">
          <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
        </div>
        <div className="w-96 flex-shrink-0 ml-8">
          <Image
            width={450}
            height={600}
            src="/static/images/joel-large.jpg"
            className="rounded"
            alt="Joel Hans"
          />
        </div>
      </div>
    </>
  )
}
