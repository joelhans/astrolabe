import CustomLink from '@components/Link'
import PageTitle from '@components/PageTitle'

export default function FourZeroFour() {
  return (
    <>
      <header className="flex flex-row flex-wrap md:space-x-6 md:flex-nowrap mt-24">
        <div>
          <PageTitle>404</PageTitle>
        </div>
      </header>
      <div className="flex flex-row flex-nowrap items-start">
        <div className="prose prose-md lg:prose-lg dark:prose-dark mb-24">
          <p>Sorry, this page doesn't exist.</p>
          <p>
            Read some of my <CustomLink href="/fiction">fiction</CustomLink>, learn a bit more{` `}
            <CustomLink href="/about" className="hover:text-sea">
              about me
            </CustomLink>
            , or find me on <CustomLink href="https://twitter.com/joelhans">Twitter</CustomLink>.
          </p>
        </div>
      </div>
    </>
  )
}
