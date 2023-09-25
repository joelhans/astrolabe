'use client'

import { useEffect, useState } from 'react'
import moment from 'moment'
import { IoTelescopeOutline } from 'react-icons/io5'
import Link from 'next/link'
import Image from 'next/image'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageHeader from '@components/PageHeader'
import PageBody from '@components/PageBody'
import PageProse from '@components/PageProse'

export default function StarLayout({ star, posts }) {
  const { mdxSource, frontMatter } = star

  const [log, setLog] = useState([])

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
      // Grab the visits via localStorage and filter for only those related to
      // this star's slug.
      setLog(setVisit().filter((d) => d.slug === frontMatter.slug))
    })()
    return () => {}
  }, [])

  return (
    <>
      <PageHeader title={frontMatter.title}>
        <p className="font-sans font-medium text-lg lg:text-2xl italic mt-8">
          Materialized by <span className="text-fuchsia-600 font-bold">{frontMatter.author}</span>{' '}
          on {moment(frontMatter.publishedOn).format('dddd, MMMM Do YYYY')}.
        </p>
      </PageHeader>
      <PageBody>
        <PageProse>
          <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
        </PageProse>
        <div className="w-full flex justify-center mt-16">
          <IoTelescopeOutline className="w-8 h-8 text-orange" />
        </div>
        <div className="mt-16 meta-content max-w-full prose lg:prose-lg">
          <MDXLayoutRenderer mdxSource={frontMatter.authorBioMdx} />
        </div>

        {/* If there are other stars in this asterism... */}
        {frontMatter.asterism && (
          <div className="mt-24 p-8 bg-gradient-to-tr from-[#0d1c48] to-[#0f062d] rounded-sm">
            <h2 className="font-sans text-gray-100 text-lg lg:text-xl font-medium !mt-0 mb-6">
              Other stars in the{' '}
              <span className="font-bold italic">{frontMatter.asterismFull}</span> asterism:
            </h2>
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Filter out any stars that are *not* in this asterism and loop through those that are. */}
              {posts
                .filter(
                  (post) => post.asterism === frontMatter.asterism && post.slug !== frontMatter.slug
                )
                .map((star) => {
                  const { slug, title, author, summary, artworkUrl } = star
                  return (
                    <Link
                      key={slug}
                      href={`/${slug}`}
                      className="group block bg-white hover:bg-gray-100 hover:bg-opacity-90 px-6 py-6 rounded duration-300"
                    >
                      <h3
                        dangerouslySetInnerHTML={{ __html: title }}
                        className="text-2xl !mt-0 mb-2"
                      />
                      <p className="font-sans text-sm font-medium mb-2">{author}</p>
                      {summary && <p className="italic">{summary}</p>}
                      {artworkUrl && (
                        <div className="blur-sm block relative mt-4">
                          <Image src={artworkUrl} width={400} height={200} />
                        </div>
                      )}
                    </Link>
                  )
                })}
            </div>
          </div>
        )}

        {log.length > 0 && (
          <div className="mt-24 w-full">
            <p className="font-serif text-3xl italic">You&rsquo;ve looked at this star before.</p>
            <div className="mt-4">
              {/* Loop through the visits to create the log. */}
              {log
                .slice(0)
                .reverse()
                .map((visit) => {
                  const { time } = visit
                  const hours = moment
                      .duration(moment(time).diff(frontMatter.publishedOn))
                      .asHours()
                      .toString(),
                    minutes = (hours.substring(hours.indexOf('.')) * 60).toString(),
                    seconds = (minutes.substring(minutes.indexOf('.')) * 60).toString()

                  return (
                    <div key={time} className="py-2">
                      <span className="font-serif text-lg text-fuchsia-600 italic">
                        {moment(time).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                      </span>
                      <br />
                      <span className="font-sans font-medium text-sm text-gray-600">
                        {Math.floor(hours)} hours, {Math.floor(minutes)} minutes, and{' '}
                        {Math.floor(seconds)} seconds after it materialized.
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        <div className="mt-24">
          <Link
            href={`/`}
            className="font-sans font-medium text-white p-8 bg-gradient-to-tr from-[#0d1c48] to-[#0f062d] rounded-sm transition-all ease-in-out hover:brightness-150"
          >
            Back to the Universe <IoTelescopeOutline className="inline w-4 h-4 ml-1" />
          </Link>
        </div>
      </PageBody>
    </>
  )
}
