import { useEffect } from 'react'
import Link from 'next/link'
import siteMetadata from '@data/siteMetadata'
import PageHeader from '@components/PageHeader'
import { PageSEO } from '@components/SEO'

export default function Links() {
  // Force overflow so we can scroll on this page.
  useEffect(() => {
    document.body.style.overflow = 'auto'
  })

  return (
    <>
      <PageSEO title={`Links • ${siteMetadata.title}`} description={siteMetadata.description} />
      <PageHeader title={'Links'} />
      <div className="flex flex-row flex-wrap items-start mt-16 lg:mt-32 mb-32 lg:mb-48">
        <div className="w-full grid gap-16">
          <div className="w-full">
            <Link
              href="/about"
              className="w-full block text-white text-4xl bg-green p-8 rounded"
              passHref
            >
              About <em>Astrolabe</em>
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/submissions"
              className="w-full block text-white text-4xl bg-green p-8 rounded"
              passHref
            >
              Submissions
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
