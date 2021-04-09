import siteMetadata from '@data/siteMetadata'
import LearnHome from '@/layouts/LearnHome'
import { PageSeo } from '@components/SEO'

export default function Learn() {
  return (
    <>
      <PageSeo
        title={`Learn`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/learn`}
      />
      <LearnHome title="Learn" />
    </>
  )
}
