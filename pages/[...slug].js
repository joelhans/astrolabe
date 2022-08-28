import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import moment from 'moment'
import { IoTelescopeOutline } from 'react-icons/io5'
import fs from 'fs'
import { STAR_CONTENT_PATH } from '@config/constants'
import { getFrontMatter, getSingleContent } from '@lib/mdx'
import generateRss from '@lib/generate-rss'
import siteMetadata from '@data/siteMetadata'
import CustomLink from '@components/Link'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageTitle from '@components/PageTitle'
import { BlogSEO } from '@components/SEO'

export async function getStaticPaths() {
  const posts = await getFrontMatter(STAR_CONTENT_PATH, false)
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
  const content = await getSingleContent(STAR_CONTENT_PATH, postSlug)

  // Generate RSS feed.
  const posts = await getFrontMatter(STAR_CONTENT_PATH, true)
  const rss = generateRss(posts)
  fs.writeFileSync('./public/index.xml', rss)

  if (!content) {
    console.warn(`No content found for slug ${postSlug}`)
  }

  return { props: { content, posts } }
}

export default function Article({ content, posts }) {
  const [log, setLog] = useState([])

  const { mdxSource, frontMatter } = content

  // Detect the development environment.
  const env = process.env.NODE_ENV

  // This function handles cookies for stars.
  function setCookie() {
    const cookies = new Cookies()

    // Either instantiate our list of visits based on our cookies, or create a
    // new array if there are no cookies. We also create a new variable that we
    // can push into and use to update cookies without updating the previous
    // log.
    const visits = cookies.get('visitedStars') || new Array()
    let visitList = Object.assign([], visits)

    // Create a new cookie entry.
    const cookie = {
      slug: frontMatter.slug,
      time: new Date().toISOString(),
    }

    // Regardless of whether there's a cookie or not, we push this new cookie to
    // our array, then set that full array as the cookie. We can then return the
    // array for state to take over.
    visitList.push(cookie)
    cookies.set('visitedStars', visitList, { path: '/', sameSite: 'strict' })

    // Return the original visits array, not the updated one, so that we don't
    // show the *current* pageview in the list, only past ones.
    return visits
  }

  useEffect(() => {
    ;(async () => {
      // Force overflow so we can scroll on this page.
      document.body.style.overflow = 'auto'

      // Grab the visits via cookies and filter for only those related to this
      // star's slug.
      const visits = await setCookie().filter((d) => d.slug === frontMatter.slug)
      setLog(visits)
    })()
    return () => {}
  }, [])

  return (
    <>
      {frontMatter.draft !== true || (frontMatter.draft === true && env === 'development') ? (
        <>
          <BlogSEO
            {...frontMatter}
            url={`${siteMetadata.siteUrl}/articles/${frontMatter.slug}`}
            title={`${frontMatter.title} • ${siteMetadata.title}`}
          />
          <div className="ml-48 lg:ml-64">
            <div className="max-w-screen-lg mx-auto mb-auto px-6">
              <header className="mt-48">
                <PageTitle>{frontMatter.title}</PageTitle>
                <p className="text-2xl mt-8">
                  {frontMatter.author}{' '}
                  <IoTelescopeOutline className="inline-block mx-4 mb-2 text-cyan" />{' '}
                  {frontMatter.date}
                </p>
              </header>
              <div className="mt-32 mb-32">
                <div className="star-content prose prose-lg lg:prose-2xl mb-16">
                  <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
                  <div className="flex justify-center mt-16">
                    <IoTelescopeOutline className="w-8 h-8 text-cyan" />
                  </div>
                  <div className="mt-16 prose-xl lg:prose-2xl italic">{frontMatter.authorBio}</div>
                </div>
                {frontMatter.asterism && (
                  <div className="mt-12 p-8 bg-lime-200 rounded">
                    <h2 className="text-2xl mb-4">Other stars in {frontMatter.asterismFull}:</h2>
                    <div className="grid gap-4 grid-cols-3">
                      {posts
                        .filter(
                          (post) =>
                            post.asterism === frontMatter.asterism && post.slug !== frontMatter.slug
                        )
                        .map((star) => {
                          const { slug, title, author, summary } = star
                          return (
                            <CustomLink
                              key={slug}
                              href={`/${slug}`}
                              className="block bg-white px-6 py-6 rounded"
                            >
                              <a>
                                <h3 className="text-2xl mb-2">{title}</h3>
                                <p className="mb-2">{author}</p>
                                <p className="italic">{summary}</p>
                              </a>
                            </CustomLink>
                          )
                        })}
                    </div>
                  </div>
                )}
                {log.length > 0 && (
                  <div className="mt-16 pt-16 border-t border-gray-400">
                    <p className="text-3xl italic">You have visited this star before.</p>
                    <div className="grid gap-8 grid-cols-3 mt-12">
                      {/* Filter out only visits for this star, then loop through the visits to create the log. */}
                      {log.map((visit) => {
                        return (
                          <div key={visit.time} className="px-4 py-2 bg-violet-700 rounded">
                            <span className="text-sm font-mono font-bold text-white">
                              {moment(visit.time).fromNow()}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
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
