import Link from './Link'
import siteMetadata from '@data/siteMetadata'
import SocialIcon from '@components/social-icons'

export default function Footer() {
  return (
    <footer className="font-sans bg-sea bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-100 px-6 py-16">
      <div className="text-sm text-gray-900 dark:text-gray-200 font-medium max-w-screen-lg mx-auto px-6">
        <div>
          {`© ${new Date().getFullYear()}`} <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
