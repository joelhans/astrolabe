import PageTitle from '@components/PageTitle'

const PageHeader = ({ title, children }) => {
  return (
    <header className="mt-24 lg:mt-48">
      <PageTitle>{title}</PageTitle>
      {children}
    </header>
  )
}

export default PageHeader
