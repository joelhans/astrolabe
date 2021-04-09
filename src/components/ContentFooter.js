import Link from '@components/Link'

export default function ContentFooter({ editUrl }) {
  return (
    <footer className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
      <Link href={editUrl}>{'Edit this page'}</Link>
    </footer>
  )
}
