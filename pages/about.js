import Image from 'next/image'
import hydrate from 'next-mdx-remote/hydrate'
import { getSingleContent } from '@/lib/mdx'
import { PageSeo } from '@components/SEO'
import { BASE_CONTENT_PATH } from '@config/constants'
import PageTitle from '@components/PageTitle'
import siteMetadata from '@data/siteMetadata'
import MDXComponents from '@components/MDXComponents'

export async function getStaticProps() {
  const content = await getSingleContent(BASE_CONTENT_PATH, 'about')

  return {
    props: {
      mdxSource: content.mdxSource,
      frontMatter: content.frontMatter,
    },
  }
}

export default function About({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return (
    <>
      <PageSeo
        title={frontMatter.title}
        description={frontMatter.summary}
        url={`${siteMetadata.siteUrl}/${frontMatter.slug}`}
      />
      <header className="flex flex-row flex-wrap md:space-x-6 md:flex-nowrap mt-24">
        <div>
          <PageTitle>Hi, I'm Joel Hans.</PageTitle>
          <div className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark">
            <p className="text-xl md:text-2xl lg:text-3xl text-steel">
              I'm a fiction writer with a few other disguises.
            </p>
          </div>
        </div>
        <div className="w-64 h-64 md:w-64 md:h-auto rounded-full mt-8 mx-auto md:mt-0">
          <Image
            width={400}
            height={400}
            src="/static/images/joel.jpg"
            className="rounded-full"
            alt="Joel Hans"
          />
        </div>
      </header>
      <div className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark mb-24">{content}</div>
    </>
  )
}
