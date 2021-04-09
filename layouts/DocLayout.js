import Link from '@components/Link'
import PageTitle from '@components/PageTitle'
import { DocSeo } from '@components/SEO'
import Sidebar from '@components/Sidebar'
import TableOfContents from '@components/TableOfContents'
import siteMetdata from '@data/siteMetadata'

const editUrl = (fileName) => `${siteMetdata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetdata.siteUrl}/blog/${slug}`)}`

export default function DocLayout({ children, frontMatter, toc }) {
  const { slug, fileName, title } = frontMatter

  // Check if the doc is a Cloud doc. If so, be sure to show Cloud items in the sidebar.
  let SidebarDocsCloud = slug.startsWith('cloud/') ? true : false

  return (
    <>
      <DocSeo url={`${siteMetdata.siteUrl}/docs/${frontMatter.slug}`} {...frontMatter} />
      <div className="flex mt-12 px-6">
        <Sidebar SidebarType="docs" SidebarDocsCloud={SidebarDocsCloud} />
        <article
          id="content-wrapper"
          className="min-w-0 w-full flex flex-auto lg:static lg:max-h-full lg:overflow-visible"
        >
          <div className="w-full mx-6 lg:ml-8 lg:mr-0">
            <header className="">
              <PageTitle>{title}</PageTitle>
            </header>
            <div className="">
              <div className="">
                <div className="pt-10 pb-8 prose lg:prose-lg dark:prose-dark max-w-none">
                  {children}
                </div>
                <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                  <Link href={discussUrl(slug)} rel="nofollow">
                    {'Discuss on Twitter'}
                  </Link>
                  {` • `}
                  <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
                </div>
              </div>
            </div>
          </div>
        </article>
        <TableOfContents toc={toc} />
      </div>
    </>
  )
}
