import Link from '@components/Link'
import { IoLogoRss } from 'react-icons/io5'

const RSS = () => {
  return (
    <div className="hidden sm:block ml-2">
      <Link href="/index.xml">
        <IoLogoRss className="w-4 h-4" />
      </Link>
    </div>
  )
}

export default RSS
