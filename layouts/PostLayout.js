import CustomLink from '@components/Link'
import PageTitle from '@components/PageTitle'
import SectionContainer from '@components/SectionContainer'
import { BlogSeo } from '@components/SEO'
import Tag from '@components/Tag'
import siteMetdata from '@data/siteMetadata'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ children, frontMatter, next, prev }) {
  const { slug, fileName, date, title, lastmod, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSeo url={`${siteMetdata.siteUrl}/articles/${frontMatter.slug}`} {...frontMatter} />
      <article>
        <div className="">
          <header className="py-8 md:py-16 text-center">
            <PageTitle>{title}</PageTitle>
          </header>

          <div className="mb-24" style={{ gridTemplateRows: 'auto 1fr' }}>
            {/* <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <img src={siteMetdata.image} alt="avatar" className="w-10 h-10 rounded-full" />
                    <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{siteMetdata.author}</dd>
                      <dt className="sr-only">Twitter</dt>
                      <dd>
                        <Link
                          href={siteMetdata.twitter}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {siteMetdata.twitter.replace('https://twitter.com/', '@')}
                        </Link>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl> */}
            <div className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark mx-auto">
              <div className="pb-8">{children}</div>
              {/* <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
              </div> */}
              <footer>
                {/* <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                  {tags && (
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                      {prev && (
                        <div>
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Previous post
                          </h2>
                          <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                            <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && (
                        <div>
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Next post
                          </h2>
                          <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                            <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div> */}
                <div className="">
                  <p className="text-base font-bold text-gray-500 dark:text-gray-400 mb-8">Last updated:
                    {' '}
                    <time dateTime={lastmod}>
                      {new Date(lastmod).toLocaleDateString(siteMetdata.locale, postDateTemplate)}
                    </time>
                  </p>
                  <CustomLink
                    href="/articles"
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    &larr; See my other articles
                  </CustomLink>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
