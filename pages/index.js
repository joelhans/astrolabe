import { PageSeo } from '@components/SEO'
import CustomLink from '@components/Link'
import siteMetadata from '@data/siteMetadata'
import Tag from '@components/Tag'
import { getFrontMatter } from '@/lib/mdx'
import { ARTICLES_CONTENT_PATH } from '@config/constants'

export async function getStaticProps() {
  const posts = await getFrontMatter(ARTICLES_CONTENT_PATH, true)
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
        <div className="prose prose-md lg:prose-lg dark:prose-dark">
          <p className="text-xl lg:text-2xl text-steel">I'm a writer in Tucson, Arizona.</p>
          <p>
            Read some of my <CustomLink href="/fiction">fiction</CustomLink>, read an{' '}
            <CustomLink href="/articles" className="hover:text-sea">
              article
            </CustomLink>
            , learn a bit more{' '}
            <CustomLink href="/about" className="hover:text-sea">
              about me
            </CustomLink>
            , or see what I'm up to{' '}
            <CustomLink href="/now" className="hover:text-sea">
              now
            </CustomLink>
            .
          </p>
        </div>
      </div>
      <div className="mb-24">
        <h2 className="text-lg text-sea font-display font-bold uppercase mb-8">Recent articles</h2>
        <ul>
          {posts.slice(0, 3).map((frontMatter) => {
            const { slug, draft, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="block mb-16">
                <CustomLink href={`/articles/${slug}`}>
                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-2 hover:text-sea transition-all">
                    {title}
                  </h3>
                </CustomLink>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                <p className="prose prose-md lg:prose-lg dark:prose-dark text-gray-500 dark:text-gray-400 mb-1">
                  {summary}
                </p>
                <CustomLink
                  href={`/articles/${slug}`}
                  className="text-sm font-bold hover:text-sea transition-all"
                >
                  Read more &rarr;
                </CustomLink>
              </li>
            )
          })}
        </ul>
        <p className="text-xl font-medium">
          <CustomLink className="hover:text-sea transition-all" href="/articles">
            Read some other articles &rarr;
          </CustomLink>
        </p>
      </div>
    </>
  )
}
