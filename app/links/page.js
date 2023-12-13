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
        <div className="block w-full mb-8">
          <Link
            href="/"
            className="w-full block text-white text-3xl bg-green p-6 rounded hover:bg-pink"
          >
            The Universe
          </Link>
        </div>
        <div className="blockw-full mb-8">
          <Link
            href="/about"
            className="w-full block text-white text-3xl bg-green p-6 rounded hover:bg-pink"
          >
            About <em>Astrolabe</em>
          </Link>
        </div>
        <div className="w-full">
          <Link
            href="/submissions"
            className="w-full block text-white text-3xl bg-green p-6 rounded hover:bg-pink"
          >
            Submissions
          </Link>
        </div>
      </div>
    </>
  )
}
