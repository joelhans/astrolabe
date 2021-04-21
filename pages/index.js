import { PageSeo } from '@components/SEO'
import siteMetadata from '@data/siteMetadata'

export default function Home() {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div>
        <p>hi</p>
      </div>
    </>
  )
}
