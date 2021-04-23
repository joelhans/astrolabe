import { PageSeo } from '@components/SEO'
import CustomLink from '@components/Link'
import siteMetadata from '@data/siteMetadata'
import { getFrontMatter } from '@/lib/mdx'
import { POSTS_CONTENT_PATH } from '@config/constants'

export async function getStaticProps() {
  const posts = await getFrontMatter(POSTS_CONTENT_PATH)
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
        <p>
          I'm Joel. I'm a writer, teacher, and developer of things related to writing and teaching.
        </p>
        <p>
          <CustomLink href="/about"></CustomLink>
        </p>
      </div>
      <div className="grid">
        <div className="w-2/3">
          <h2 className="text-lg text-purple-500 font-display font-bold uppercase mb-8">
            Recent posts
          </h2>
          {posts.slice(0, 3).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <CustomLink key={slug} href={`/posts/${slug}`} className="group block mb-12">
                <h3 className="text-xl lg:text-2xl font-display font-bold mb-4 group-hover:text-purple-500">
                  {title}
                </h3>
                <p className="text-base lg:text-lg mb-2">{summary}</p>
                <span className="text-sm font-bold group-hover:text-erin">Read more</span>
              </CustomLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
