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
      <header className="flex flex-row flex-wrap md:space-x-6 md:flex-nowrap items-center mt-16">
        <div>
          <PageTitle>Hi, I'm Joel Hans.</PageTitle>
          <div className="prose prose-md lg:prose-lg lg:max-w-full xl:prose-xl dark:prose-dark">
            <p className="text-xl md:text-2xl lg:text-3xl text-steel">
              I'm a writer, teacher, and developer of things related to writing and teaching on the
              web.
            </p>
          </div>
        </div>
        <img
          src="static/images/joel.jpg"
          className="w-48 h-48 lg:w-64 lg:h-64 rounded-full mt-8 mx-auto md:mt-0 lg:ml-12"
          alt="Joel Hans"
        />
      </header>
      <div className="prose prose-md lg:prose-lg lg:max-w-full xl:prose-xl dark:prose-dark mt-8 md:mt-16 mb-24">
        {content}
      </div>
    </>
  )
}
