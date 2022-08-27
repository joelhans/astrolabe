import { useEffect, useState, useMemo } from 'react'
import Cookies from 'universal-cookie'
import siteMetadata from '@data/siteMetadata'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageTitle from '@components/PageTitle'
import { BlogSEO } from '@components/SEO'

export default function PostLayout({ children, frontMatter }) {
  const [visitationLog, setVisitationLog] = useState([])

  const { slug, title, publishedOn, updatedOn, author } = frontMatter
  const date = updatedOn ? updatedOn : publishedOn

  // Set cookie for this star page. If there is not currently any cookies set,
  // create the proper cookie. If there are cookies set, simply add this new
  // visit to the list.
  const visitedStars = useMemo(() => {
    const cookies = new Cookies()
    let visitList = cookies.get('visitedStars')
    const cookie = {
      slug: frontMatter.slug,
      time: Date(),
    }

    if (!visitList) {
      cookies.set('visitedStars', [cookie], { path: '/', sameSite: 'strict' })
      return visitList
    } else {
      visitList.push(cookie)
      cookies.set('visitedStars', visitList)
      return visitList
    }
  }, [])

  useEffect(() => {
    setVisitationLog(visitedStars)
    // console.log(visitationLog)
  }, [visitedStars])

  return (
    <>
      <BlogSEO
        {...frontMatter}
        url={`${siteMetadata.siteUrl}/articles/${slug}`}
        title={`${title} • ${siteMetadata.title}`}
      />
      <div className="ml-48 lg:ml-64">
        <div className="max-w-screen-lg mx-auto mb-auto px-6">
          <header className="mt-48">
            <PageTitle>{title}</PageTitle>
            <p className="text-2xl mt-8">
              {author} ★ {date}
            </p>
          </header>
          <div className="flex flex-row flex-wrap items-start mt-32">
            <div className="star-content prose prose-lg lg:prose-2xl mb-24">
              <MDXLayoutRenderer mdxSource={children} frontMatter={frontMatter} />
            </div>
            <div>
              <h2>Visitation log:</h2>
              {/* <p>{visitationLog[0]}</p> */}
              {visitationLog.map((visit) => {
                ;<p>{visit.date}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
