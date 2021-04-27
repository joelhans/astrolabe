import Link from './Link'
import siteMetadata from '@data/siteMetadata'
import SocialIcon from '@components/social-icons'

export default function Footer() {
  return (
    <footer className="font-sans bg-sea bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-100 px-6 py-16">
      <div className="flex flex-row max-w-screen-lg mx-auto px-6">
        <div className="w-1/2">
          <div className="block text-2xl font-display text-sea font-bold mb-2">Joel Hans</div>
          <div className="block text-xs font-medium">
            Thanks for stopping by!{' '}
            <span role="img" aria-label="emoji wave">
              👋
            </span>
          </div>
        </div>
        <div className="w-1/4 mb-8 text-sm text-gray-500 dark:text-gray-200">
          {/* <h3>Posts</h3> */}
        </div>
        <div className="w-1/4 mb-8 text-sm text-gray-500 dark:text-gray-200">
          <h3 className="font-bold mb-2">Links</h3>
          <Link
            className="block font-medium mb-1 hover:text-steel"
            href="https://twitter.com/joelhans"
          >
            Twitter
          </Link>
          <Link className="block font-medium mb-1 hover:text-steel" href="/index.xml">
            RSS
          </Link>
          <Link className="block font-medium mb-1 hover:text-steel" href="mailto:j@joelhans.com">
            Email
          </Link>
        </div>
      </div>
      <div className="text-sm text-gray-900 dark:text-gray-200 font-medium max-w-screen-lg mx-auto px-6">
        <div>
          {`© ${new Date().getFullYear()}`} <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
