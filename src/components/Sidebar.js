import Link from './Link'

const Sidebar = ({ nav }) => {

  console.log(nav)

  return (
    <div className="fixed z-40 inset-0 flex-none h-full w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden">
      <ul className="mb-12">
        <li>
          <Link href="/docs" className="flex items-center text-gray-700 hover:text-erin dark:text-gray-100 font-medium py-1.5">
            <div className="inline-block bg-erin p-1 mr-2 rounded-sm">
              <svg className="h-4 w-4" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.4C2.72 2.4 2.5 2.62 2.5 2.9C2.5 3.18 2.72 3.4 3 3.4C3.28 3.4 3.5 3.18 3.5 2.9C3.5 2.62 3.28 2.4 3 2.4ZM4.5 2.4C4.22 2.4 4 2.62 4 2.9C4 3.18 4.22 3.4 4.5 3.4C4.78 3.4 5 3.18 5 2.9C5 2.62 4.78 2.4 4.5 2.4ZM11.23 0.5H2.77C1.52 0.5 0.5 1.52 0.5 2.77V9.22C0.5 10.47 1.52 11.49 2.77 11.49H11.22C12.47 11.49 13.49 10.47 13.49 9.22V2.77C13.5 1.52 12.48 0.5 11.23 0.5ZM12 9.23C12 9.66 11.65 10 11.23 10H2.77C2.34 10 2 9.65 2 9.23V5.25H12V9.23ZM12 3.75H2V2.77C2 2.34 2.35 2 2.77 2H11.22C11.65 2 11.99 2.35 11.99 2.77V3.75H12Z" fill="white"/></svg>
            </div>
            Documentation
          </Link>
        </li>
        <li>
          <Link href="/tutorials" className="flex items-center text-gray-700 hover:text-salmon dark:text-gray-100 font-medium py-1.5">
            <div className="inline-block bg-salmon p-1 mr-2 rounded-sm">
              <svg className="h-4 w-4" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 2.75H7.5V4.25H10C10.83 4.25 11.5 3.58 11.5 2.75ZM10 5.25H7.5V6.75H8.5C9.33 6.75 10 6.08 10 5.25ZM5 0V6.75C5 7.71 4.21 8.5 3.25 8.5C2.29 8.5 1.5 7.71 1.5 6.75V3C1.5 2.72 1.72 2.5 2 2.5C2.28 2.5 2.5 2.72 2.5 3V6.75C2.5 7.16 2.84 7.5 3.25 7.5C3.66 7.5 4 7.16 4 6.75V3C4 1.9 3.1 1 2 1C0.9 1 0 1.9 0 3V6.75C0 8.54 1.46 10 3.25 10H10.75C12.54 10 14 8.54 14 6.75V0H5ZM12.5 6.75C12.5 7.71 11.71 8.5 10.75 8.5H6.5V1.5H12.5V6.75Z" fill="white"/></svg>
            </div>
            Tutorials
          </Link>
        </li>
        <li>
          <Link href="/academy" className="flex items-center text-gray-700 hover:text-lilac dark:text-gray-100 font-medium py-1.5">
            <div className="inline-block bg-lilac p-1 mr-2 rounded-sm">
              <svg className="h-4 w-4" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 2.75H7.5V4.25H10C10.83 4.25 11.5 3.58 11.5 2.75ZM10 5.25H7.5V6.75H8.5C9.33 6.75 10 6.08 10 5.25ZM5 0V6.75C5 7.71 4.21 8.5 3.25 8.5C2.29 8.5 1.5 7.71 1.5 6.75V3C1.5 2.72 1.72 2.5 2 2.5C2.28 2.5 2.5 2.72 2.5 3V6.75C2.5 7.16 2.84 7.5 3.25 7.5C3.66 7.5 4 7.16 4 6.75V3C4 1.9 3.1 1 2 1C0.9 1 0 1.9 0 3V6.75C0 8.54 1.46 10 3.25 10H10.75C12.54 10 14 8.54 14 6.75V0H5ZM12.5 6.75C12.5 7.71 11.71 8.5 10.75 8.5H6.5V1.5H12.5V6.75Z" fill="white"/></svg>
            </div>
            Academy
          </Link>
        </li>
        <li>
          <Link href="/screencasts" className="flex w-full h-full flex items-center text-gray-700 hover:text-indigo dark:text-gray-100 font-medium py-1.5">
            <div className="inline-block bg-indigo p-1 mr-2 rounded-sm">
              <svg className="h-4 w-4" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 1.73L8.21 6L1.5 10.27V1.73ZM1.39 0.130005C0.67 0.130005 0 0.700005 0 1.51V10.47C0 11.28 0.67 11.85 1.39 11.85C1.64 11.85 1.89 11.78 2.13 11.63L10.03 6.6C10.49 6.31 10.49 5.65 10.03 5.36L2.13 0.330005C1.89 0.200005 1.63 0.130005 1.39 0.130005Z" fill="white"/></svg>
            </div>
            Screencasts
          </Link>
        </li>
      </ul>
      <ul>
        {nav.map((entry) => {
          const children = entry.children

          return (
            <li className="">
              <span className="z-10 block mt-6 mb-4 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">{entry.title}</span>
              {children && 
                <ul>
                  {children.map((child) => (
                    <li>
                      <Link href={child.href} className="block flex items-center my-1.5 tracking-wide text-gray-700 hover:text-erin">
                        <a>{child.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar