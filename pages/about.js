import hydrate from 'next-mdx-remote/hydrate'
import { getSingleContent } from '@/lib/mdx'
import { PageSeo } from '@components/SEO'
import { BASE_CONTENT_PATH } from '@config/constants'
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
      <header className="flex flex-row items-center mt-16">
        <div className="prose prose-xl dark:prose-dark ">
          <h1 className="text-6xl font-display font-bold">Hi, I'm Joel Hans.</h1>
          <p className="text-2xl md:text-3xl text-steel">
            I'm a writer, teacher, and developer of things related to writing and teaching on the
            web.
          </p>
        </div>
        <img
          src="static/images/joel.jpg"
          className="w-64 h-64 rounded-full ml-12"
          alt="Joel Hans"
        />
      </header>
      <div className="prose prose-xl dark:prose-dark mt-16">{content}</div>
    </>
  )
}
