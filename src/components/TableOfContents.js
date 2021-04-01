import Link from './Link'

const TableOfContents = ({ toc }) => {
  return (
    <aside className="hidden xl:text-sm xl:block flex-none w-64">
      <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pb-6 top-32">
        <span className="block mb-4 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">
          On this page
        </span>
        <ul>
          {toc.map((heading, idx) => {
            return (
              <li key={idx} className="toc-item py-1 hover:text-erin" aria-level={heading.level}>
                <Link href={heading.hash} className="text-gray-500">
                  {heading.text}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

export default TableOfContents
