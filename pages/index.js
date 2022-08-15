import { PageSEO } from '@components/SEO'
import siteMetadata from '@data/siteMetadata'
import { getFrontMatter } from '@/lib/mdx'
import { WORK_CONTENT_PATH } from '@config/constants'
import Universe from '@components/Universe'

export async function getStaticProps() {
  const posts = await getFrontMatter(WORK_CONTENT_PATH, true)
  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Universe posts={posts} />
      {/* <div className="mt-24 mb-24">
        <h2 className="text-lg text-sea font-display font-bold uppercase mb-8">Recent work</h2>
        <ul>
          {posts.slice(0, 3).map((frontMatter) => {
            const { slug, draft, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="block mb-16">
                <CustomLink href={`/${slug}`}>
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
                  href={`/${slug}`}
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
            Read some other work &rarr;
          </CustomLink>
        </p>
      </div> */}
    </>
  )
}
