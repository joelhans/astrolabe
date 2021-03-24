import Link from '@components/Link'
import PageTitle from '@components/PageTitle'
import SectionContainer from '@components/SectionContainer'
import { BlogSeo } from '@components/SEO'
import Tag from '@components/Tag'
import Sidebar from '@components/Sidebar'
import navDocs from '@data/navDocs'
import TableOfContents from '@components/TableOfContents'
import siteMetdata from '@data/siteMetadata'

const editUrl = (fileName) => `${siteMetdata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetdata.siteUrl}/blog/${slug}`)}`

export default function DocLayout({ children, frontMatter, toc}) {
  const { slug, fileName, title } = frontMatter

  return (
    <>
    <BlogSeo url={`${siteMetdata.siteUrl}/docs/${frontMatter.slug}`} {...frontMatter} />
    <div class="flex mt-12">
      <Sidebar nav={navDocs} />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="xl:pb-6">
            <div className="space-y-1">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose lg:prose-lg dark:prose-dark max-w-none">{children}</div>
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
