import Link from '@components/Link'
import PageWrapper from '@components/PageWrapper'
import ContentWrapper from '@components/ContentWrapper'
import ContentHeader from '@components/ContentHeader'
import ContentBody from '@components/ContentBody'
import Sidebar from '@components/Sidebar'

export default function DocsLayout({ title }) {
  return (
    <>
      <PageWrapper>
        <Sidebar SidebarType="docs" />
        <ContentWrapper>
          <ContentHeader title={title} />
          <ContentBody prose={false}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 xl:gap-8">
              <div className="relative col-span-2 border-4 border-erin rounded shadow-md">
                <Link
                  href="/docs/get-started/installation"
                  className="group relative block px-6 py-8"
                >
                  <h2 className="w-full uppercase tuppercase tracking-wide font-semibold text-lg text-gray-900 mb-4">
                    Documentation
                  </h2>
                  <p className="text-xl text-gray-900 font-medium mb-4 text-shadow-md">
                    A description of what you get goes here.
                  </p>
                  <span className="inline-block text-base font-medium bg-erin bg-opacity-50 px-4 py-2 rounded-sm group-hover:bg-opacity-90">
                    Get started
                  </span>
                </Link>
              </div>
              <div className="relative col-span-2 border-4 border-salmon rounded shadow-md">
                <Link href="/tutorials" className="group relative block px-6 py-8">
                  <h2 className="w-full uppercase text-sm font-medium text-black mb-4">
                    Tutorials
                  </h2>
                  <p className="text-xl text-gray-900 font-medium mb-4 text-shadow-md">
                    A description of what you get goes here.
                  </p>
                  <span className="inline-block text-base bg-salmon bg-opacity-50 px-4 py-2 rounded-sm group-hover:bg-opacity-90">
                    Follow a tutorial
                  </span>
                </Link>
              </div>
              <div className="relative col-span-2 border-4 border-lilac rounded shadow-md">
                <Link href="/learn" className="group relative block px-6 py-8">
                  <h2 className="w-full uppercase text-sm font-medium text-black mb-4">Academy</h2>
                  <p className="text-xl text-gray-900 font-medium mb-4 text-shadow-md">
                    A description of what you get goes here.
                  </p>
                  <span className="inline-block text-base font-medium bg-lilac bg-opacity-50 px-4 py-2 rounded-sm group-hover:bg-opacity-90">
                    Start learning
                  </span>
                </Link>
              </div>
              <div className="relative col-span-2 border-4 border-indigo rounded shadow-md">
                <Link href="/collectors" className="group relative block px-6 py-8">
                  <h2 className="w-full uppercase text-sm font-medium text-black mb-4">
                    Data collectors
                  </h2>
                  <p className="text-xl text-gray-900 font-medium mb-4 text-shadow-md">
                    A description of what you get goes here.
                  </p>
                  <span className="inline-block text-base font-medium bg-indigo bg-opacity-50 px-4 py-2 rounded-sm group-hover:bg-opacity-90">
                    Watch along
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex mt-24">
              <h2 className="text-xl sm:text-2xl lg:text-3xl leading-none font-bold tracking-tight text-gray-800 dark:text-gray-100 mb-8 sm:mb-10">
                What's new in Netdata?
              </h2>
            </div>
          </ContentBody>
        </ContentWrapper>
      </PageWrapper>
    </>
  )
}
