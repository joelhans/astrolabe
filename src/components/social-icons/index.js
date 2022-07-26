import Mail from './mail.svg'
import Mastodon from './mastodon.svg'
import Instagram from './instagram.svg'
import Twitter from './twitter.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  mastodon: Mastodon,
  instagram: Instagram,
  twitter: Twitter,
}

const SocialIcon = ({ kind, href, className = '' }) => {
  const SocialSvg = components[kind]

  return (
    <a
      className={`block text-sm text-pink transition hover:text-gray-600 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-green hover:text-gray-900 h-6 w-6 transition-all ease-in-out`}
      />
    </a>
  )
}

export default SocialIcon
