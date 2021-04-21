import siteMetadata from '@data/siteMetadata'
import DocsLayout from '@/layouts/DocsLayout'
import { PageSeo } from '@components/SEO'

export default function Docs() {
  return (
    <>
      <PageSeo
        title={`Documentation`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/docs`}
      />
      <DocsLayout title="Get started with Netdata" />
    </>
  )
}
