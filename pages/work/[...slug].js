import { WORK_CONTENT_PATH } from '@config/constants'
import { getFrontMatter, getSingleContent } from '@lib/mdx'
import PostLayout from '@layouts/PostLayout'

export async function getStaticPaths() {
  const posts = await getFrontMatter(WORK_CONTENT_PATH, false)
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
  const content = await getSingleContent(WORK_CONTENT_PATH, postSlug)

  if (!content) {
    console.warn(`No content found for slug ${postSlug}`)
  }

  return { props: { content } }
}

export default function Article({ content }) {
  const { mdxSource, frontMatter } = content

  // Detect the development environment.
  const env = process.env.NODE_ENV

  return (
    <>
      {frontMatter.draft !== true || (frontMatter.draft === true && env === 'development') ? (
        <PostLayout frontMatter={frontMatter}>{mdxSource}</PostLayout>
      ) : (
        <div className="my-48 text-center">
          <h1 className="text-xl font-bold">
            Under construction.{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </h1>
        </div>
      )}
    </>
  )
}
