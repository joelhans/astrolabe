import { BASE_CONTENT_PATH } from '@config/constants'
import { getSingleContent } from '@lib/mdx'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageHeader from '@components/PageHeader'
import PageBody from '@components/PageBody'

async function getAboutContent() {
  const content = await getSingleContent(BASE_CONTENT_PATH, 'about')
  return content
}

export async function generateMetadata() {
  const { frontMatter } = await getAboutContent()
  return {
    title: frontMatter.title,
    description: frontMatter.summary,
  }
}

export default async function About() {
  const { mdxSource, frontMatter } = await getAboutContent()

  return (
    <>
      <PageHeader title={frontMatter.title} />
      <PageBody>
        <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
      </PageBody>
    </>
  )
}