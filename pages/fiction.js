import hydrate from 'next-mdx-remote/hydrate'
import { getSingleContent } from '@/lib/mdx'
import { PageSeo } from '@components/SEO'
import { BASE_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import MDXComponents from '@components/MDXComponents'

export async function getStaticProps() {
  const content = await getSingleContent(BASE_CONTENT_PATH, 'fiction')

  return {
    props: {
      mdxSource: content.mdxSource,
      frontMatter: content.frontMatter,
    },
  }
}

export default function Fiction({ mdxSource, frontMatter }) {
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
      <header className="mt-16">
        <h1 className="text-6xl font-display font-bold mb-6 dark:text-gray-100">
          {frontMatter.title}
        </h1>
        <div className="prose prose-xl dark:prose-dark ">
          <p className="text-xl md:text-2xl text-steel">
            {frontMatter.summary} {frontMatter.summary_cont}
          </p>
        </div>
      </header>
      <div className="prose prose-xl dark:prose-dark mt-16">{content}</div>
    </>
  )
}
