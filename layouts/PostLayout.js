import siteMetadata from '@data/siteMetadata'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageTitle from '@components/PageTitle'
import { BlogSEO } from '@components/SEO'

export default function PostLayout({ children, frontMatter }) {
  const { slug, title, publishedOn, updatedOn, author } = frontMatter
  const date = updatedOn ? updatedOn : publishedOn

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
          </div>
        </div>
      </div>
    </>
  )
}
