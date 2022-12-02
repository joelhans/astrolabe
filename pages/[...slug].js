import { useEffect, useState } from 'react'
import moment from 'moment'
import { IoTelescopeOutline } from 'react-icons/io5'
import fs from 'fs'
import { STAR_CONTENT_PATH, CATACLYSM } from '@config/constants'
import { getFrontMatter, getSingleContent } from '@lib/mdx'
import generateRss from '@lib/generate-rss'
import siteMetadata from '@data/siteMetadata'
import CustomLink from '@components/Link'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageHeader from '@components/PageHeader'
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
  const cleanTitle = frontMatter.title.replace(/<[^>]+>/g, '')

  // This function handles cookies for stars.
  function setVisit() {
    // Either instantiate our list of visits based on our cookies, or create a
    // new array if there are no cookies. We also create a new variable that we
    // can push into and use to update cookies without updating the previous
    // log.
    const visits = JSON.parse(localStorage.getItem('visitedStars')) || new Array()
    let visitList = [...visits]

    // Create a new cookie entry.
    const cookie = {
      slug: frontMatter.slug,
      time: new Date().toISOString(),
    }

    // Regardless of whether there's a cookie or not, we push this new cookie to
    // our array, then set that full array as the cookie. We can then return the
    // array for state to take over.
    visitList.push(cookie)
    localStorage.setItem('visitedStars', JSON.stringify(visitList))

    // Return the original visits array, not the updated one, so that we don't
    // show the *current* pageview in the list, only past ones.
    return visits
  }

  useEffect(() => {
    ;(async () => {
      // Force overflow so we can scroll on this page.
      document.body.style.overflow = 'auto'

      // Grab the visits via localStorage and filter for only those related to
      // this star's slug.
      setLog(setVisit().filter((d) => d.slug === frontMatter.slug))
    })()
    return () => {}
  }, [])

  return (
    <>
      <BlogSEO
        {...frontMatter}
        url={`${siteMetadata.siteUrl}/articles/${frontMatter.slug}`}
        title={`${cleanTitle} • ${siteMetadata.title}`}
      />
      <PageHeader title={frontMatter.title}>
        <p className="text-lg lg:text-2xl italic mt-8">
          Materialized by <span className="text-fuchsia-600 font-bold">{frontMatter.author}</span>{' '}
          on {moment(frontMatter.publishedOn).format('dddd, MMMM Do YYYY')}.
        </p>
      </PageHeader>
      <div className="mt-16 lg:mt-32 mb-32 lg:mb-48">
        <div className="relative block star-content prose max-w-none lg:prose-2xl">
          <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
          <div className="flex justify-center mt-16">
            <IoTelescopeOutline className="w-8 h-8 text-orange" />
          </div>
          <div className="mt-16 prose lg:prose-2xl italic">{frontMatter.authorBio}</div>
        </div>

        {/* If there are other stars in this asterism... */}
        {frontMatter.asterism && (
          <div className="mt-24 p-8 bg-green rounded">
            <h2 className="text-gray-100 text-2xl mb-4">
              Other stars in <span className="font-bold italic">{frontMatter.asterismFull}</span>:
            </h2>
            <div className="grid gap-4 lg:grid-cols-3">
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
                      className="group block bg-white hover:bg-gray-100 hover:bg-opacity-90 px-6 py-6 rounded duration-300"
                    >
                      <h3 dangerouslySetInnerHTML={{ __html: title }} className="text-2xl mb-2" />
                      <p className="mb-2">{author}</p>
                      <p className="italic">{summary}</p>
                    </CustomLink>
                  )
                })}
            </div>
          </div>
        )}
        {log.length > 0 && (
          <div className="mt-24">
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

                  return (
                    <div key={time} className="py-2">
                      <span className="text-lg text-fuchsia-600 italic">
                        {moment(time).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                      </span>
                      <br />
                      <span className="text-xs text-gray-600 font-mono">
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
