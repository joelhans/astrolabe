import Image from 'next/image'
import CustomLink from '@components/Link'
import PageTitle from '@components/PageTitle'
import { BlogSeo } from '@components/SEO'
import Tag from '@components/Tag'
import siteMetadata from '@data/siteMetadata'
import { MDXLayoutRenderer } from '@components/MDXComponents'

import LinkData from '@data/linkData.json'

const postDateTemplate = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}

export default function PostLayout({ children, frontMatter }) {
  const { slug, title, publishedOn, updatedOn, tags, images } = frontMatter

  const date = updatedOn ? updatedOn : publishedOn

  // Filter `LinkData` to only the links that reference this page as the destination.
  const LinkRefs = LinkData.filter((link) => link.dest.includes(slug))

  return (
    <>
      <BlogSeo url={`${siteMetadata.siteUrl}/articles/${frontMatter.slug}`} {...frontMatter} />
      <article>
        <header className="my-16 lg:my-24">
          <PageTitle>{title}</PageTitle>
          <div className="text-sm font-mono mt-4">
            Published:{` `}
            <time className="text-white px-1 py-0.5 bg-steel rounded-sm" dateTime={publishedOn}>
              {new Date(publishedOn).toLocaleString(siteMetadata.locale, postDateTemplate)}
            </time>
          </div>
          {images[0] && (
            <div className="mt-8">
              <Image className="rounded-sm" src={images[0]} width={1200} height={630} />
            </div>
          )}
        </header>
        <div className="mb-24">
          <div className="prose prose-md lg:prose-lg dark:prose-dark mr-auto">
            <MDXLayoutRenderer mdxSource={children} frontMatter={frontMatter} />
            <footer className="mt-16">
              {tags.indexOf('To Mabel, To Ida') === -1 && (
                <>
                  <div className="pt-8 mb-8 border-t border-b border-gray-200">
                    <p className="text-xl lg:text-2xl font-bold !mt-0 !mb-2">
                      Links to this article
                    </p>
                    <div className="grid grid-flow-col grid-cols-2 gap-4 mb-8">
                      {LinkRefs.length ? (
                        LinkRefs.map((link) => {
                          const { src, title, text } = link
                          return (
                            <CustomLink
                              key={src}
                              href={src}
                              className="group p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-500 rounded-sm"
                            >
                              <h3 className="block !text-lg font-medium !mt-0 mb-2 group-hover:text-sea transition-all">
                                {title}
                              </h3>
                              <p
                                className="block text-sm text-gray-500 dark:text-gray-300 font-normal"
                                dangerouslySetInnerHTML={{ __html: text }}
                              />
                            </CustomLink>
                          )
                        })
                      ) : (
                        <p className="text-sm text-gray-500 !mt-1 !m-0">
                          No links to this article found.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <p className="text-base font-bold text-gray-500 dark:text-gray-400 !mb-1">
                      Last updated:{' '}
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </p>
                    <div>
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                </>
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
