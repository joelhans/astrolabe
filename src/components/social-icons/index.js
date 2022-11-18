import Mail from './mail.svg'
import Mastodon from './mastodon.svg'
import Instagram from './instagram.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  mastodon: Mastodon,
  instagram: Instagram,
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
        className={`fill-current text-green dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-6 w-6`}
      />
    </a>
  )
}

export default SocialIcon
