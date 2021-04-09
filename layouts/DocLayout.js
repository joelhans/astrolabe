import PageWrapper from '@components/PageWrapper'
import ContentWrapper from '@components/ContentWrapper'
import ContentHeader from '@components/ContentHeader'
import ContentBody from '@components/ContentBody'
import ContentFooter from '@components/ContentFooter'
import { DocSeo } from '@components/SEO'
import Sidebar from '@components/Sidebar'
import TableOfContents from '@components/TableOfContents'
import siteMetdata from '@data/siteMetadata'

const editUrl = (fileName) => `${siteMetdata.siteRepo}/blob/master/data/blog/${fileName}`

export default function DocLayout({ children, frontMatter, toc }) {
  const { slug, fileName, title } = frontMatter

  // Check if the doc is a Cloud doc. If so, be sure to show Cloud items in the sidebar.
  let SidebarDocsCloud = slug.startsWith('cloud/') ? true : false

  return (
    <>
      <DocSeo url={`${siteMetdata.siteUrl}/docs/${frontMatter.slug}`} {...frontMatter} />
      <PageWrapper>
        <Sidebar SidebarType="docs" SidebarDocsCloud={SidebarDocsCloud} />
        <ContentWrapper>
          <ContentHeader title={title} />
          <ContentBody>{children}</ContentBody>
          <ContentFooter editUrl={editUrl(fileName)} />
        </ContentWrapper>
        <TableOfContents toc={toc} />
      </PageWrapper>
    </>
  )
}
