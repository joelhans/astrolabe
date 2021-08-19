import CustomLink from '@components/Link'
import PageTitle from '@components/PageTitle'
import SectionContainer from '@components/SectionContainer'
import { BlogSeo } from '@components/SEO'
import Tag from '@components/Tag'
import siteMetdata from '@data/siteMetadata'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import ConvertKit from '@components/ConvertKit'

const config = {
  formId: 2474731,
  template: 'clare',
  submitText: 'Sign up',
  stack: false,
  buttonBackground: '#20b2aa',
}

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ children, frontMatter }) {
  const { slug, fileName, date, title, lastmod, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSeo url={`${siteMetdata.siteUrl}/articles/${frontMatter.slug}`} {...frontMatter} />
      <article>
        <div className="">
          <header className="mt-24 mb-24 text-center">
            <PageTitle>{title}</PageTitle>
          </header>
          <div className="mb-24" style={{ gridTemplateRows: 'auto 1fr' }}>
            <div className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark mx-auto">
              <MDXLayoutRenderer mdxSource={children} frontMatter={frontMatter} />
              <footer>
                <div className="">
                  <p className="text-base font-bold text-gray-500 dark:text-gray-400 mb-8">
                    Last updated:{' '}
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
            <ConvertKit />
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
