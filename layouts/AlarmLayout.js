import Link from '@components/Link'
import PageTitle from '@components/PageTitle'
import { DocSeo } from '@components/SEO'
import Sidebar from '@components/Sidebar'
import TableOfContents from '@components/TableOfContents'
import siteMetdata from '@data/siteMetadata'

import Highlight from '@components/Highlight'

export default function DocLayout({ data }) {
  const { name, config, help } = data

  return (
    <>
      {/* <DocSeo url={`${siteMetdata.siteUrl}/docs/${frontMatter.slug}`} {...frontMatter} /> */}
      <div className="flex mt-12 px-6">
        <Sidebar SidebarType="docs" />
        <article
          id="content-wrapper"
          className="min-w-0 w-full flex flex-auto lg:static lg:max-h-full lg:overflow-visible"
        >
          <div className="w-full mx-6 lg:ml-8 lg:mr-0">
            <header className="">
              <PageTitle className="text-xl">
                Alarm: <code className="text-2xl lg:text-4xl">{name}</code>
              </PageTitle>
            </header>

            <div className="pt-10 pb-8 prose lg:prose-lg dark:prose-dark max-w-none">
              <h2>
                What does <code>{name}</code> mean?
              </h2>
              <p>{help.what}</p>
              <h2>Next steps when you see this alarm</h2>
              <p>{help.next}</p>
              <h2>Configuration</h2>
              <p>
                To tweak this preconfigured alarm, navigate to your{' '}
                <Link href="/docs/configure/directory">Netdata config directory</Link> and use{' '}
                <code>edit-config</code> to open the&nbsp;
                <code>conf.d/{config}</code> file.
              </p>
              <Highlight
                code={`sudo ./edit-config conf.d/${config}`.trim()}
                lang={`bash`}
                lines={false}
              />
              <p>
                Read more about the basis of configuring alarms, or look at the reference for every
                available setting.
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
