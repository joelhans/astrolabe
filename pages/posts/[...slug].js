import fs from 'fs'
import hydrate from 'next-mdx-remote/hydrate'
import { getFrontMatter, getSingleContent, dateSortDesc } from '@/lib/mdx'
import generateRss from '@/lib/generate-rss'
import { POSTS_CONTENT_PATH } from '@config/constants'
import PostLayout from '@/layouts/PostLayout'
import MDXComponents from '@components/MDXComponents'

export async function getStaticPaths() {
  const posts = await getFrontMatter(POSTS_CONTENT_PATH)
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
  const content = await getSingleContent(POSTS_CONTENT_PATH, postSlug)

  const posts = await getFrontMatter(POSTS_CONTENT_PATH)
  const postsSorted = posts.sort((a, b) => dateSortDesc(a.date, b.date))
  const postIndex = postsSorted.findIndex((post) => post.slug === postSlug)
  const prev = postsSorted[postIndex + 1] || null
  const next = postsSorted[postIndex - 1] || null

  const rss = generateRss(posts)
  fs.writeFileSync('./public/index.xml', rss)

  if (!content) {
    console.warn(`No content found for slug ${postSlug}`)
  }

  if (!content) {
    console.warn(`No content found for slug ${postSlug}`)
  }

  return {
    props: {
      mdxSource: content.mdxSource,
      frontMatter: content.frontMatter,
      toc: content.toc,
      prev: prev,
      next: next,
    },
  }
}

export default function Doc({ mdxSource, frontMatter, toc }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return (
    <>
      <PostLayout frontMatter={frontMatter} toc={toc}>
        {content}
      </PostLayout>
    </>
  )
}
