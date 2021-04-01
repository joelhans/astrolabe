import hydrate from 'next-mdx-remote/hydrate'
import { getContent } from '@/lib/mdx'
import { DOCS_CONTENT_PATH } from '@config/constants'
import DocLayout from '@/layouts/DocLayout'
import MDXComponents from '@components/MDXComponents'

export async function getStaticPaths() {
  const posts = await getContent(DOCS_CONTENT_PATH)
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
  const posts = await getContent(DOCS_CONTENT_PATH)
  const postSlug = slug.join('/')
  const [post] = posts.filter((post) => post.slug === postSlug)

  if (!post) {
    console.warn(`No content found for slug ${postSlug}`)
  }

  return {
    props: {
      mdxSource: post.md,
      frontMatter: post.data,
      toc: post.toc,
    },
  }
}

export default function Doc({ mdxSource, frontMatter, toc }) {
  const content = hydrate(mdxSource, { MDXComponents })

  return (
    <>
      <DocLayout frontMatter={frontMatter} toc={toc}>
        {content}
      </DocLayout>
    </>
  )
}
