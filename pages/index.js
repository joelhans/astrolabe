import { PageSeo } from '@components/SEO'
import CustomLink from '@components/Link'
import siteMetadata from '@data/siteMetadata'
import { getFrontMatter } from '@/lib/mdx'
import { ARTICLES_CONTENT_PATH } from '@config/constants'

export async function getStaticProps() {
  const posts = await getFrontMatter(ARTICLES_CONTENT_PATH)
  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div className="bg-green-100 w-full"></div>

      <div id="hero" className="py-16">
        <div className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark">
          <p className="text-xl md:text-2xl lg:text-3xl text-steel">
            I'm Joel. I'm a writer, teacher, and developer of things related to writing and teaching
            on the web.
          </p>
          <p>
            <CustomLink href="/about" className="hover:text-sea">
              Start here
            </CustomLink>
            , or check out one of my recent articles below.
          </p>
        </div>
      </div>
      <div className="mb-24">
        <h2 className="text-lg text-sea font-display font-bold uppercase mb-8">Recent articles</h2>
        <ul>
          {posts.slice(0, 3).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug}>
                <CustomLink key={slug} href={`/articles/${slug}`} className="group block mb-16">
                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-4 group-hover:text-steel">
                    {title}
                  </h3>
                  <p className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark text-gray-500 dark:text-gray-400 mb-2">
                    {summary}
                  </p>
                  <span className="text-sm font-bold group-hover:text-steel">Read more</span>
                </CustomLink>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
