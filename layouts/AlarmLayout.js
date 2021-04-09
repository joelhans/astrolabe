import Link from '@components/Link'
import PageWrapper from '@components/PageWrapper'
import ContentWrapper from '@components/ContentWrapper'
import ContentHeader from '@components/ContentHeader'
import ContentBody from '@components/ContentBody'
import ContentFooter from '@components/ContentFooter'
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
      <PageWrapper>
        <Sidebar SidebarType="learn" />
        <ContentWrapper>
          <ContentHeader title={`Alarm: ${name}`} />
          <ContentBody>
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
          </ContentBody>
        </ContentWrapper>
        {/* <TableOfContents toc={toc} /> */}
      </PageWrapper>
    </>
  )
}
