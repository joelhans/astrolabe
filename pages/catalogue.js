import { useEffect, useState } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import { STAR_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import { getFrontMatter } from '@lib/mdx'
import PageHeader from '@components/PageHeader'
import { PageSEO } from '@components/SEO'

export async function getStaticProps() {
  const posts = await getFrontMatter(STAR_CONTENT_PATH, true)
  return { props: { posts } }
}

export default function Catalogue({ posts }) {
  const [searchValue, setSearchValue] = useState('')

  const filteredStars = _(posts)
    .groupBy((x) => x.author)
    .map((value, key) => ({ author: key, stars: value }))
    .value()
    .sort((a, b) => {
      const aLastName = a.author.split(' ').pop()
      const bLastName = b.author.split(' ').pop()
      aLastName.localeCompare(bLastName)
    })
    .filter((cluster) => {
      let searchContent = cluster.author
      cluster.stars.map((star) => {
        searchContent += star.title + star.asterism + star.asterismFull
      })
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })

  // Force overflow so we can scroll on this page.
  useEffect(() => {
    document.body.style.overflow = 'auto'
  })

  return (
    <>
      <PageSEO title={`Catalogue • ${siteMetadata.title}`} description={siteMetadata.description} />
      <PageHeader title="The Catalogue">
        <p className="text-lg md:text-xl mt-8">
          Discover the Universe by browsing our growing list of astrolabists and their
          transmissions.
        </p>
      </PageHeader>
      <div className="relative max-w-lg mt-8 lg:mt-16">
        <input
          aria-label="Search..."
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="block w-full text-lg text-gray-900 placeholder-gray-600 px-4 py-2 bg-gray-200 border border-gray-500 rounded-md  focus:ring-cyan focus:border-cyan"
        />
        <svg
          className="absolute w-5 h-5 text-gray-500 right-3 top-3 dark:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="flex flex-row flex-wrap items-start mt-16 lg:mt-32 mb-32 lg:mb-48">
        <div className="relative w-full gap-8 columns-1 md:columns-3">
          {filteredStars.map((authorCluster) => {
            const { author, stars } = authorCluster
            return (
              <div
                key={author}
                className="relative break-inside-avoid-column first-of-type:mt-0 mt-8"
              >
                <h2 className="text-2xl">{author}</h2>
                <ul>
                  {stars.map((star) => {
                    const { id, title, asterismFull } = star
                    return (
                      <li className="mt-2" key={id}>
                        <Link href={id} className="text-lg hover:text-green" passHref>
                          <h3 dangerouslySetInnerHTML={{ __html: title }} />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
