import { STAR_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import { getSingleContent, getFrontMatter } from '@lib/mdx'
import StarLayout from '@/layouts/StarLayout'

async function getStar(slug) {
  const star = await getSingleContent(STAR_CONTENT_PATH, slug)
  return star
}

async function getStars() {
  const posts = await getFrontMatter(STAR_CONTENT_PATH, true)
  return posts
}

export async function generateMetadata({ params: { slug } }) {
  const { frontMatter } = await getSingleContent(STAR_CONTENT_PATH, slug)

  const cleanTitle = frontMatter.title.replace(/<[^>]+>/g, '')
  const publishedAt = new Date(frontMatter.publishedOn).toISOString()
  const modifiedAt = new Date(frontMatter.updatedOn || frontMatter.publishedOn).toISOString()

  return {
    title: `${cleanTitle} • ${frontMatter.tags[0]} from ${frontMatter.author}`,
    description: frontMatter.summary,
    author: frontMatter.author,
    publisher: siteMetadata.title,
    openGraph: {
      title: `${cleanTitle} • ${frontMatter.tags[0]} from ${frontMatter.author}`,
      description: frontMatter.summary,
      url: `https://www.astrolabe.ooo/${slug}`,
      images: [
        {
          url: !frontMatter.images ? siteMetadata.socialBanner : frontMatter.images[0],
          width: 1200,
          height: 630,
          alt: frontMatter.summary,
        },
      ],
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      author: frontMatter.author,
      publisher: siteMetadata.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cleanTitle} • ${frontMatter.tags[0]} from ${frontMatter.author}`,
      description: frontMatter.summary,
      site: siteMetadata.siteUrl,
      creator: '@astrolabe',
      images: [
        {
          url: !frontMatter.images ? siteMetadata.socialBanner : frontMatter.images[0],
          width: 1200,
          height: 630,
          alt: frontMatter.summary,
        },
      ],
    },
  }
}

export default async function Star({ params: { slug } }) {
  const star = await getStar(slug)
  const posts = await getStars()

  return (
    <>
      <StarLayout star={star} posts={posts} />
    </>
  )
}
