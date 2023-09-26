import PageTitle from '@components/PageTitle'

const PageHeader = ({ title, children }) => {
  return (
    <header className="relative mt-48 lg:mt-64">
      <PageTitle>{title}</PageTitle>
      {children}
    </header>
  )
}

export default PageHeader
