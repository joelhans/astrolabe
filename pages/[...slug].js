import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import moment from 'moment'
import { IoTelescopeOutline } from 'react-icons/io5'
import fs from 'fs'
import { STAR_CONTENT_PATH, CATACLYSM } from '@config/constants'
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
      <BlogSEO
        {...frontMatter}
        url={`${siteMetadata.siteUrl}/articles/${frontMatter.slug}`}
        title={`${frontMatter.title} • ${siteMetadata.title}`}
      />
      <header className="mt-48">
        <PageTitle>{frontMatter.title}</PageTitle>
        <p className="text-2xl italic mt-8">
          Discovered by <span className="text-fuchsia-600 font-bold">{frontMatter.author}</span> on{' '}
          {moment(frontMatter.publishedOn).format('dddd, MMMM Do YYYY')}.
        </p>
      </header>
      <div className="mt-32 mb-48">
        <div className="star-content prose prose-lg lg:prose-2xl mb-24">
          <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
          <div className="flex justify-center mt-16">
            <IoTelescopeOutline className="w-8 h-8 text-cyan" />
          </div>
          <div className="mt-16 prose-xl lg:prose-2xl italic">{frontMatter.authorBio}</div>
        </div>

        {/* If there are other stars in this asterism... */}
        {frontMatter.asterism && (
          <div className="mt-12 p-8 bg-lime-200 rounded">
            <h2 className="text-2xl mb-4">
              Other stars in <span className="font-bold italic">{frontMatter.asterismFull}</span>:
            </h2>
            <div className="grid gap-4 grid-cols-3">
              {/* Filter out any stars that are *not* in this asterism and loop through those that are. */}
              {posts
                .filter(
                  (post) => post.asterism === frontMatter.asterism && post.slug !== frontMatter.slug
                )
                .map((star) => {
                  const { slug, title, author, summary } = star
                  return (
                    <CustomLink
                      key={slug}
                      href={`/${slug}`}
                      className="group block bg-white hover:bg-lime-100 px-6 py-6 rounded duration-300"
                    >
                      <h3 className="text-2xl mb-2">{title}</h3>
                      <p className="mb-2">{author}</p>
                      <p className="italic">{summary}</p>
                    </CustomLink>
                  )
                })}
            </div>
          </div>
        )}
        {log.length > 0 && (
          <div className="pt-16 border-t border-gray-400">
            <p className="text-3xl italic">You have visited this star before.</p>
            <div className="mt-4">
              {/* Loop through the visits to create the log. */}
              {log
                .slice(0)
                .reverse()
                .map((visit) => {
                  const { time } = visit
                  const hours = moment.duration(moment(time).diff(CATACLYSM)).asHours().toString(),
                    minutes = (hours.substring(hours.indexOf('.')) * 60).toString(),
                    seconds = (minutes.substring(minutes.indexOf('.')) * 60).toString()

                  console.log(CATACLYSM)

                  return (
                    <div key={time} className="py-2">
                      <span className="text-sm text-gray-600 font-mono">
                        {moment(time).format('dddd, MMMM Do YYYY, h:mm:ss a')}; or{' '}
                        {Math.floor(hours)} hours, {Math.floor(minutes)} minutes, and{' '}
                        {Math.floor(seconds)} seconds after the last cataclysm.
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
