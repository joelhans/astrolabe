import PageWrapper from '@components/PageWrapper'
import ContentWrapper from '@components/ContentWrapper'
import ContentHeader from '@components/ContentHeader'
import ContentBody from '@components/ContentBody'
import Sidebar from '@components/Sidebar'

export default function TutorialsHome({ title }) {
  return (
    <>
      <PageWrapper>
        <Sidebar SidebarType="tutorials" />
        <ContentWrapper>
          <ContentHeader title={title} />
          <ContentBody prose={false}>
            <p>Tutorials will go here.</p>
          </ContentBody>
        </ContentWrapper>
      </PageWrapper>
    </>
  )
}
