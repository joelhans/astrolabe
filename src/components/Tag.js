import Link from 'next/link'
import kebabCase from '@lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-xs font-medium uppercase text-primary-500 hover:text-steel dark:hover:text-primary-400 mb-1 transition-all">
        {text}
      </a>
    </Link>
  )
}

export default Tag
