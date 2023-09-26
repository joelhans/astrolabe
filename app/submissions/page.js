import { BASE_CONTENT_PATH } from '@config/constants'
import { getSingleContent } from '@lib/mdx'
import { MDXLayoutRenderer } from '@components/MDXComponents'
import PageHeader from '@components/PageHeader'
import PageBody from '@components/PageBody'
import PageProse from '@components/PageProse'

async function getSubmissionContent() {
  const content = await getSingleContent(BASE_CONTENT_PATH, 'submissions')
  return content
}

export async function generateMetadata() {
  const { frontMatter } = await getSubmissionContent()
  return {
    title: frontMatter.title,
    description: frontMatter.summary,
  }
}

export default async function About() {
  const { mdxSource, frontMatter } = await getSubmissionContent()

  return (
    <>
      <PageHeader title={frontMatter.title} />
      <PageBody>
        <PageProse>
          <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
        </PageProse>
      </PageBody>
    </>
  )
}
