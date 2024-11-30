import { BASE_CONTENT_PATH, STAR_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import { getSingleContent, getFrontMatter } from '@lib/mdx'
import StarLayout from '@/layouts/StarLayout'

async function getStar(slug) {
  const star = await getSingleContent(slug)
  return star
}

async function getStars() {
  const posts = await getFrontMatter(STAR_CONTENT_PATH)
  return posts
}

export async function generateStaticParams() {
  const posts = await getFrontMatter(STAR_CONTENT_PATH)
  return posts
}

export async function generateMetadata(props) {
  const params = await props.params;

  const {
    slug
  } = params;

  const { frontMatter } = await getStar(slug)

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

export default async function Star(props) {
  const params = await props.params;

  const {
    slug
  } = params;

  const posts = await generateStaticParams()
  const star = await getStar(slug)

  return (
    <>
      <StarLayout star={star} posts={posts} />
    </>
  )
}
