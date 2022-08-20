import { useEffect } from 'react'
import fs from 'fs'
import Cookies from 'universal-cookie'
import { WORK_CONTENT_PATH } from '@config/constants'
import { getFrontMatter, getSingleContent } from '@lib/mdx'
import generateRss from '@lib/generate-rss'
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

  // Generate RSS feed.
  const posts = await getFrontMatter(WORK_CONTENT_PATH, true)
  const rss = generateRss(posts)
  fs.writeFileSync('./public/index.xml', rss)

  if (!content) {
    console.warn(`No content found for slug ${postSlug}`)
  }

  return { props: { content } }
}

export default function Article({ content }) {
  const { mdxSource, frontMatter } = content

  // Set cookie for this star page.
  const cookies = new Cookies()
  let visitedStars = cookies.get('visitedStars')
  if (!visitedStars) {
    cookies.set('visitedStars', [frontMatter.slug], { path: '/', sameSite: 'strict' })
  } else {
    if (!visitedStars.includes(frontMatter.slug)) {
      visitedStars.push(frontMatter.slug)
      cookies.set('visitedStars', visitedStars)
    }
  }

  // Detect the development environment.
  const env = process.env.NODE_ENV

  // Force overflow so we can scroll on this page.
  useEffect(() => {
    document.body.style.overflow = 'auto'
  })

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
