import CustomLink from '@components/Link'
import Sidebar from '@components/Sidebar'
import { PageSeo } from '@components/SEO'
import siteMetadata from '@data/siteMetadata'
import IntegrationsData from '@data/Integrations'

export default function Integrations() {
  return (
    <>
      <PageSeo
        title={`Integrations`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/integrations`}
      />
      <div className="flex mt-12">
        <Sidebar SidebarType="docs" />
        <div className="min-w-0 w-full flex flex-auto lg:static lg:max-h-full lg:overflow-visible">
          <article className="w-full ml-8">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-12 md:mb-20">
              Data collectors
            </h1>
            <div className="grid gap-8 grid-cols-3">
              {IntegrationsData.map((integration, idx) => (
                <>
                  <div className="border border-erin">
                    <CustomLink href="">
                      <span className="">{integration.name}</span>
                    </CustomLink>
                  </div>
                </>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
