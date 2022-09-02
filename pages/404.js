import CustomLink from '@components/Link'
import PageTitle from '@components/PageTitle'

export default function FourZeroFour() {
  return (
    <>
      <header className="flex flex-row flex-wrap md:space-x-6 md:flex-nowrap mt-48">
        <PageTitle>4.0.4</PageTitle>
      </header>
      <div className="flex flex-row flex-wrap items-start mt-16">
        <div className="prose prose-lg lg:prose-2xl mb-24">
          <p>Our apologies, but this star does not exist.</p>
          <p>
            Perhaps you'd like to try <CustomLink href="/">exploring</CustomLink> some more?
          </p>
        </div>
      </div>
    </>
  )
}
