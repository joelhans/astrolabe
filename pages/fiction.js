import { PageSeo } from '@components/SEO'
import siteMetadata from '@data/siteMetadata'

export default function Home() {
  return (
    <>
      <PageSeo
        title={`Fiction`}
        description={`A collection of my published fiction`}
        url={`${siteMetadata.siteUrl}/fiction`}
      />
      <header className="mt-16">
        <h1 className="text-6xl font-display font-bold mb-6">Fiction</h1>
        <div className="prose prose-xl">
          <p>A collection of my published fiction from 2013 to today.</p>
        </div>
      </header>
    </>
  )
}
