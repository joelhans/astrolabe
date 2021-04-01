import fs from 'fs'
import path from 'path'
import { kebabCase } from '@/lib/utils'
import { getFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import { BLOG_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@components/SEO'
import generateRss from '@/lib/generate-rss'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags(BLOG_CONTENT_PATH)

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getFrontMatter(BLOG_CONTENT_PATH)
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  const rss = generateRss(filteredPosts, `tags/${params.tag}/index.xml`)
  const rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'index.xml'), rss)

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <PageSeo
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.title}`}
        url={`${siteMetadata.siteUrl}/tags/${tag}`}
      />
      <ListLayout posts={posts} title={`Netdata Blog: ${title}`} />
    </>
  )
}
