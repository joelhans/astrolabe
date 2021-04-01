import siteMetadata from '@data/siteMetadata'
import DocsLayout from '@/layouts/DocsLayout'
import Sidebar from '@components/Sidebar'
import { PageSeo } from '@components/SEO'

export default function Tutorials() {
  return (
    <>
      <PageSeo
        title={`Documentation`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/tutorials`}
      />
      <>
        <div className="flex mt-12">
          <Sidebar SidebarType="tutorials" />
          <div className="min-w-0 w-full flex flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <article className="w-full ml-8">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-12 md:mb-20">
                Tutorials
              </h1>
            </article>
          </div>
        </div>
      </>
    </>
  )
}
