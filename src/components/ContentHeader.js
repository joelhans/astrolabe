import PageTitle from '@components/PageTitle'

export default function ContentHeader({ title }) {
  return (
    <header className="w-full">
      <PageTitle>{title}</PageTitle>
    </header>
  )
}
