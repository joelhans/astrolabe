import Link from 'next/link'
import PageHeader from '@components/PageHeader'

export const metadata = {
  title: 'Links',
}

export default async function About() {
  return (
    <>
      <PageHeader title={`Links`} />
      <div className="w-full mt-16 mb-48">
      </div>
    </>
  )
}
