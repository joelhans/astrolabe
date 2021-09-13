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

      <div id="hero" className="pt-24 pb-16">
        <div className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark">
          <p className="text-xl md:text-2xl lg:text-3xl text-steel">
            I'm an author, copywriter, and technical writer living in Tucson, Arizona.
          </p>
          <p>
            Read some of my <CustomLink href="/fiction">fiction</CustomLink>, learn a bit more{` `}
            <CustomLink href="/about" className="hover:text-sea">
              about me
            </CustomLink>
            , or find me on <CustomLink href="https://twitter.com/joelhans">Twitter</CustomLink>.
          </p>
        </div>
      </div>
      <div className="mb-24">
        <h2 className="text-lg text-sea font-display font-bold uppercase mb-8">
          Recent updates &amp; articles
        </h2>
        <ul>
          {posts.slice(0, 3).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug}>
                <CustomLink key={slug} href={`/articles/${slug}`} className="group block mb-16">
                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-4 group-hover:text-steel transition-all">
                    {title}
                  </h3>
                  <p className="prose prose-md lg:prose-lg xl:prose-xl dark:prose-dark text-gray-500 dark:text-gray-400 mb-2">
                    {summary}
                  </p>
                  <span className="text-sm font-bold group-hover:text-steel transition-all">
                    Read more &rarr;
                  </span>
                </CustomLink>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
