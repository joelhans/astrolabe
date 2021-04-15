import fs from 'fs'
import hydrate from 'next-mdx-remote/hydrate'
import { getFrontMatter, dateSortDesc, getSingleContent } from '@/lib/mdx'
import { BLOG_CONTENT_PATH } from '@config/constants'
import PostLayout from '@/layouts/PostLayout'
import MDXComponents from '@components/MDXComponents'
import PageTitle from '@components/PageTitle'
import generateRss from '@/lib/generate-rss'

export async function getStaticPaths() {
  const posts = await getFrontMatter(BLOG_CONTENT_PATH)
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
  const content = await getSingleContent(BLOG_CONTENT_PATH, postSlug)

  const posts = await getFrontMatter(BLOG_CONTENT_PATH)
  const postsSorted = posts.sort((a, b) => dateSortDesc(a.date, b.date))
  const postIndex = postsSorted.findIndex((post) => post.slug === postSlug)
  const prev = postsSorted[postIndex + 1] || null
  const next = postsSorted[postIndex - 1] || null

  const rss = generateRss(posts)
  fs.writeFileSync('./public/index.xml', rss)

  if (!content) {
    console.warn(`No content found for slug ${postSlug}`)
  }

  return {
    props: {
      mdxSource: content.mdxSource,
      frontMatter: content.frontMatter,
      prev,
      next,
    },
  }
}

export default function Blog({ mdxSource, frontMatter, prev, next }) {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  })

  return (
    <>
      {frontMatter.draft !== true ? (
        <PostLayout frontMatter={frontMatter} prev={prev} next={next}>
          {content}
        </PostLayout>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
