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
        <article className="mt-48">
          <header className="my-16 lg:my-24">
            <PageTitle>{title}</PageTitle>
          </header>
          <div className="mb-24">
            <div className="prose prose-dark prose-md lg:prose-lg mr-auto">
              <MDXLayoutRenderer mdxSource={children} frontMatter={frontMatter} />
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
