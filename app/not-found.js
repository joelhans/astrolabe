import Link from 'next/link'
import PageHeader from '@components/PageHeader'
import PageBody from '@components/PageBody'

export default function NotFound() {
  return (
    <>
      <PageHeader title={`4.0.4`} />
      <PageBody>
        <div className="prose prose-lg lg:prose-2xl mb-64">
          <p>Our apologies, but this part of the universe has not yet materialized.</p>
          <p>
            Perhaps you'd like to try <Link href="/">exploring</Link> some more?
          </p>
        </div>
      </PageBody>
    </>
  )
}
