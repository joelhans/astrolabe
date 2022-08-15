import siteMetadata from '@data/siteMetadata'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageTitle from '@components/PageTitle'
import { BlogSEO } from '@components/SEO'

export default function PostLayout({ children, frontMatter }) {
  const { slug, title, publishedOn, updatedOn, tags, images } = frontMatter
  const date = updatedOn ? updatedOn : publishedOn

  return (
    <>
      <BlogSEO
        {...frontMatter}
        url={`${siteMetadata.siteUrl}/articles/${slug}`}
        title={`${title} • ${siteMetadata.title}`}
      />
      <main className="max-w-screen-lg mx-auto mb-auto px-6">
        <header className="flex flex-row flex-wrap md:space-x-6 md:flex-nowrap mt-48">
          <PageTitle>{title}</PageTitle>
        </header>
        <div className="flex flex-row flex-wrap items-start mt-16">
          <div className="prose prose-lg lg:prose-2xl mb-24">
            <MDXLayoutRenderer mdxSource={children} frontMatter={frontMatter} />
          </div>
        </div>
      </main>
    </>
  )
}
