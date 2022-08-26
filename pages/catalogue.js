import { useEffect, useState } from 'react'
import Link from 'next/link'
import { WORK_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import { getFrontMatter } from '@lib/mdx'
import PageTitle from '@components/PageTitle'
import { PageSEO } from '@components/SEO'

export async function getStaticProps() {
  const posts = await getFrontMatter(WORK_CONTENT_PATH, true)
  return { props: { posts } }
}

export default function Catalogue({ posts }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredArticles = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title +
      frontMatter.summary +
      frontMatter.author +
      frontMatter.asterismFull +
      frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // Force overflow so we can scroll on this page.
  useEffect(() => {
    document.body.style.overflow = 'auto'
  })

  return (
    <>
      <PageSEO title={`Catalogue • ${siteMetadata.title}`} description={siteMetadata.description} />
      <div className="ml-48 lg:ml-64">
        <div className="max-w-screen-lg mx-auto mb-auto px-6">
          <header className="mt-48">
            <PageTitle>The Catalogue</PageTitle>
            <p className="text-lg md:text-xl mt-8">
              The Catalogue is another way of accessing the works of <em>Astrolabe</em>. Look
              through the list or search via a piece's name, author, or asterism.
            </p>
          </header>
          <div className="relative max-w-lg mt-16">
            <input
              aria-label="Search the stars"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search the stars"
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
          <div className="flex flex-row flex-wrap items-start mt-24">
            <div className="mb-24">
              <ul>
                {filteredArticles.map((post) => {
                  const { id, title, summary, author, asterismFull } = post
                  return (
                    <li key={id} className="mb-16 last:mb-0">
                      <Link href={`/${post.id}`}>
                        <a className="group">
                          <h2 className="text-black text-3xl font-bold mb-2 transition-all group-hover:text-cyan">
                            {title}
                          </h2>
                          <p className="text-base mb-2">
                            {author} {asterismFull && `| ${asterismFull}`}
                          </p>
                          <p className="text-xl text-gray-600 italic">{summary}</p>
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
