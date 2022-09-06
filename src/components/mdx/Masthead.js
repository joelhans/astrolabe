import CustomLink from '@components/Link'

const Masthead = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div className="prose prose-xl">
          <p>
            Joel Hans (he/him) was once called a saguaro in disguise. His prose has been published
            in <em>West Branch</em>, <em>No Tokens</em>, <em>Puerto del Sol</em>,{' '}
            <em>Booth: A Journal</em>, and more. He has an MFA from the University of Arizona, where
            he also served as the managing editor of <em>Fairy Tale Review</em>. He still lives in
            Tucson, Arizona with his family. Find him{' '}
            <CustomLink href="https://twitter.com/joelhans">@joelhans</CustomLink> or at{' '}
            <CustomLink href="https://joelhans.com">joelhans.com</CustomLink>.
          </p>
        </div>
        <div className="prose prose-xl">
          <p>
            Jae Towle Vieira (she/they) always returns to the river. Their short fiction has been
            published in <em>Carve</em>, <em>Passages North</em>, <em>Mississippi Review</em>,{' '}
            <em>The Normal School</em>, <em>New England Review</em>, and elsewhere. They have an MFA
            from the University of Arizona. They are the founding editor of{' '}
            <CustomLink href="https://manzanitapapers.com/">Manzanita Papers</CustomLink>. Find them{' '}
            <CustomLink href="https://instagram.com/jaetowlevieira">@jaetowlevieira</CustomLink>.
          </p>
        </div>
      </div>
    </>
  )
}

export default Masthead
