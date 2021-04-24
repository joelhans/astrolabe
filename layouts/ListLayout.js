import CustomLink from '@components/Link'
import Tag from '@components/Tag'
import siteMetdata from '@data/siteMetadata'
import { useState } from 'react'

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export default function ListLayout({ posts, title }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <>
      <div className="mt-16">
        <h1 className="text-6xl font-display font-bold mb-6 dark:text-gray-100">{title}</h1>
        <div className="prose prose-xl dark:prose-dark">
          <p className="text-xl md:text-2xl text-steel">
            My articles about writing on the web, at the intersection between fiction, technical
            writing, documentation, and the development tools you'll need to to be successful in
            whichever path you choose.
          </p>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
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
        </div>
        <div className="mt-16 mb-24">
          <ul>
            {!filteredBlogPosts.length && 'No articles found.'}
            {filteredBlogPosts.map((frontMatter) => {
              const { slug, draft, date, title, summary, tags } = frontMatter

              return (
                <li key={slug}>
                  <CustomLink key={slug} href={`/articles/${slug}`} className="group block mb-16">
                    <h3 className="text-xl lg:text-2xl font-display font-bold mb-4 group-hover:text-steel">
                      {title}
                    </h3>
                    <p className="prose prose-xl text-gray-500 dark:text-gray-400 mb-2">
                      {summary}
                    </p>
                    <span className="text-sm font-bold group-hover:text-steel">Read more</span>
                  </CustomLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
