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
          {/* {images[0] && (
            <div className="mt-8">
              <Image className="rounded-sm" src={images[0]} width={1200} height={630} alt={title} />
            </div>
          )} */}
        </header>
        <div className="mb-24">
          <div className="prose prose-md lg:prose-lg dark:prose-dark mr-auto">
            <MDXLayoutRenderer mdxSource={children} frontMatter={frontMatter} />
            <footer className="mt-16">
              <div className="text-sm font-mono pt-8 mb-8 border-t border-gray-200">
                Published:{` `}
                <time className="text-white px-1 py-0.5 bg-steel rounded-sm" dateTime={publishedOn}>
                  {new Date(publishedOn).toLocaleString(siteMetadata.locale, postDateTemplate)}
                </time>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}
