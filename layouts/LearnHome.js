import Link from '@components/Link'
import PageWrapper from '@components/PageWrapper'
import ContentWrapper from '@components/ContentWrapper'
import ContentHeader from '@components/ContentHeader'
import ContentBody from '@components/ContentBody'
import Sidebar from '@components/Sidebar'

export default function LearnHome({ title }) {
  return (
    <>
      <PageWrapper>
        <Sidebar SidebarType="learn" />
        <ContentWrapper>
          <ContentHeader title={title} />
          <ContentBody prose={false}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 xl:gap-8">
              <div className="relative col-span-2 border-4 border-erin rounded shadow-md">
                <Link href="/learn/alarms" className="group relative block px-6 py-8">
                  <h2 className="w-full uppercase tuppercase tracking-wide font-semibold text-lg text-gray-900 mb-4">
                    Alarms
                  </h2>
                  <p className="text-xl text-gray-900 mb-4 text-shadow-md">
                    See a description of every alarm that comes preconfigured with Netdata, plus
                    troubleshooting next steps and configuration details.
                  </p>
                  <span className="inline-block text-base font-medium bg-erin bg-opacity-50 px-4 py-2 rounded-sm group-hover:bg-opacity-90">
                    View alarms
                  </span>
                </Link>
              </div>
            </div>
          </ContentBody>
        </ContentWrapper>
      </PageWrapper>
    </>
  )
}
