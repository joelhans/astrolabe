import hydrate from 'next-mdx-remote/hydrate'
import { getFrontMatter, getSingleContent } from '@/lib/mdx'
import { LEARN_CONTENT_PATH } from '@config/constants'
import DocLayout from '@/layouts/DocLayout'
import MDXComponents from '@components/MDXComponents'

export async function getStaticPaths() {
  const posts = await getFrontMatter(LEARN_CONTENT_PATH)
  const paths = posts.map(({ slug }) => ({
    params: {
      slug: slug.split('/'),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const postSlug = slug.join('/')
  const content = await getSingleContent(LEARN_CONTENT_PATH, postSlug)

  if (!content) {
    console.warn(`No content found for slug ${postSlug}`)
  }

  return {
    props: {
      mdxSource: content.mdxSource,
      frontMatter: content.frontMatter,
      toc: content.toc,
    },
  }
}

export default function Doc({ mdxSource, frontMatter, toc }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return (
    <>
      <DocLayout frontMatter={frontMatter} toc={toc}>
        {content}
      </DocLayout>
    </>
  )
}
