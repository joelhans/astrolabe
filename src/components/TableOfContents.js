import Link from './Link'

const TableOfContents = ({toc}) => {
  return (
    <div className="px-6 py-6 bg-gray-200 dark:bg-gray-800 rounded">
      <ul>
        {toc.map((heading, idx) => {
          return (
            <li 
              key={idx}
              className=""
            >
              {heading.text}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TableOfContents