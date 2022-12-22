import CustomLink from '@components/Link'
import PageTitle from '@components/PageTitle'

const PageHeader = ({ title, children }) => {
  return (
    <header className="relative mt-48 lg:mt-64">
      <div className="group absolute -top-32">
        <CustomLink
          href={`/`}
          className="flex flex-row items-center font-sans font-medium text-2xl align-middle"
        >
          <span className="px-2 py-0 rounded-full group-hover:bg-green group-hover:text-gray-100 transition-all ease-in-out">
            &larr;
          </span>
          <span className="opacity-0 ml-2 text-sm group-hover:opacity-100 transition-all ease-in-out">
            back to the Universe
          </span>
        </CustomLink>
      </div>
      <PageTitle>{title}</PageTitle>
      {children}
    </header>
  )
}

export default PageHeader
