import CustomLink from '@components/Link'
import PageTitle from '@components/PageTitle'
import SectionContainer from '@components/SectionContainer'
import { BlogSeo } from '@components/SEO'
import Tag from '@components/Tag'
import siteMetadata from '@data/siteMetadata'
import { MDXLayoutRenderer } from '@components/MDXComponents'

import LinkData from '@data/linkData.json'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ children, frontMatter }) {
  const { slug, title, publishedOn, updatedOn, tags } = frontMatter

  const date = updatedOn ? updatedOn : publishedOn

  // Filter `LinkData` to only the links that reference this page as the destination.
  const LinkRefs = LinkData.filter((link) => link.dest.includes(slug))

  return (
    <>
      <BlogSeo url={`${siteMetadata.siteUrl}/articles/${frontMatter.slug}`} {...frontMatter} />
      <article>
        <header className="my-16 lg:my-24">
          <PageTitle>{title}</PageTitle>
        </header>
        <div className="mb-24">
          <div className="prose prose-md lg:prose-lg dark:prose-dark mr-auto">
            <MDXLayoutRenderer mdxSource={children} frontMatter={frontMatter} />
            <footer className="mt-24">
              {tags.indexOf('To Mabel, To Ida') === -1 && (
                <div className="p-8 bg-steel bg-opacity-5 rounded-sm mb-12">
                  <p className="font-bold !mt-0">Links to this article</p>
                  <div className="grid grid-flow-col grid-cols-2 gap-4 mb-8">
                    {LinkRefs.length ? (
                      LinkRefs.map((link) => {
                        const { src, title, text } = link
                        return (
                          <CustomLink
                            key={src}
                            href={src}
                            className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-500 rounded-sm"
                          >
                            <h3 className="block !text-lg font-medium !mt-0 mb-2">{title}</h3>
                            <p
                              className="block text-sm text-gray-500 dark:text-gray-300 font-normal"
                              dangerouslySetInnerHTML={{ __html: text }}
                            />
                          </CustomLink>
                        )
                      })
                    ) : (
                      <p className="text-sm text-gray-500 !-mt-4 !m-0">
                        No links to this article found.
                      </p>
                    )}
                  </div>
                  <p className="text-base font-bold text-gray-500 dark:text-gray-400 !my-0">
                    Last updated:{' '}
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </p>
                </div>
              )}
              <CustomLink
                href="/articles"
                className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                &larr; See my other articles
              </CustomLink>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}
