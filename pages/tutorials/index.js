import siteMetadata from '@data/siteMetadata'
import TutorialsHome from '@/layouts/TutorialsHome'
import { PageSeo } from '@components/SEO'

export default function Tutorials() {
  return (
    <>
      <PageSeo
        title={`Documentation`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/tutorials`}
      />
      <TutorialsHome title="Tutorials" />
    </>
  )
}
