import { TagSEO } from '@components/SEO'
import siteMetadata from '@data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import { ARTICLES_CONTENT_PATH } from '@config/constants'

export async function getStaticPaths() {
  const tags = await getAllTags()

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
  const allPosts = await getFrontMatter(ARTICLES_CONTENT_PATH, true)
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  const tagText = filteredPosts[0].tags.filter((t) => kebabCase(t).includes(params.tag))

  console.log(tagText)

  return { props: { posts: filteredPosts, tag: params.tag, text: tagText } }
}

export default function Tag({ posts, tag, text }) {
  // Capitalize first letter and convert space to dash
  const title = 'Tag: ' + text[0].charAt(0).toUpperCase() + text[0].slice(1)
  return (
    <>
      <TagSEO
        title={`Tag: ${tag}`}
        description={`All articles related to ${tag}.`}
        url={`${siteMetadata.siteUrl}/tags/${tag}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
