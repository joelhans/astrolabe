import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'
import CustomLink from '@components/Link'
import SidebarDocsData from '@data/SidebarDocsData'

import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { BsBookHalf } from 'react-icons/bs'

const SidebarItems = ({ sidebar }) => {
  const { items } = sidebar
  const router = useRouter()

  // Get the initial status of the sidebar. Basically, this uses the current
  // route to then open up the associated collapsible section in the sidebar.
  const IntiSidebarStatus = (initStatus, { items } = sidebar) => {
    items.map((item) => {
      const isOpen = router.asPath.includes(item.slug) ? true : false
      initStatus = {
        ...initStatus,
        [item.title]: isOpen,
      }
    })
    return initStatus
  }

  // Set the state using `IntiSidebarStatus`.
  const [SidebarCollapse, SidebarCollapseToggle] = useState(IntiSidebarStatus)

  // Change the status on every click to headings of collapsible sections.
  const onSidebarCollapse = (title) => {
    SidebarCollapseToggle((status) => {
      let isOpen = !!status[title]
      status = {
        ...status,
        [title]: !isOpen,
      }
      return status
    })
  }

  return (
    <ul>
      {items.map((entry) => {
        const children = entry.children
        return (
          <li key={entry.title} className="">
            <button
              onClick={() => onSidebarCollapse(entry.title)}
              className="w-full flex items-center justify-between mt-4 mb-2 cursor-pointer"
            >
              <span className="text-lg text-gray-900 dark:text-gray-100">{entry.title}</span>
              {SidebarCollapse[entry.title] ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {children && (
              <ul
                key={entry.title}
                className={`border-l-2 border-salmon pl-4 ${
                  SidebarCollapse[entry.title] ? 'block' : 'hidden'
                }`}
              >
                {children.map((child) => (
                  <li key={child.title}>
                    {child.separator ? (
                      <span className="block h-1 w-1/3 my-2 border-b border-gray-200"></span>
                    ) : child.subcategory ? (
                      <span className="uppercase tracking-wide text-xs font-semibold">
                        {child.title}
                      </span>
                    ) : (
                      <CustomLink
                        href={child.href}
                        className={`flex items-center justify-between text-base text-gray-700 hover:text-erin my-1 ${
                          router.asPath == child.href
                            ? 'text-indigo dark:text-indigo font-semibold'
                            : ''
                        } dark:text-gray-300 dark:hover:text-erin`}
                      >
                        <p dangerouslySetInnerHTML={{ __html: child.title }} />
                      </CustomLink>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

const SidebarCollectors = ({ CollectorsSearchCallback, FilterCollectorsCallback }) => {
  const [CollectorsFilter, CollectorsFilterChange] = useState({})
  const [CollectorsSearch, SearchCollectorsChange] = useState('')

  const onCollectorFilter = (value, type) => {
    CollectorsFilterChange((filter) => {
      let isActive = !!filter[value]
      filter = {
        ...filter,
        [type]: {
          [value]: !isActive,
        },
      }
      FilterCollectorsCallback(filter)
      return filter
    })
  }

  const onCollectorSearch = (query) => {
    // console.log(query)
    SearchCollectorsChange(() => {
      CollectorsSearchCallback(query)
      return query
    })
  }

  const Checkbox = ({
    value,
    name,
    label,
    filter = CollectorsFilter,
    search = CollectorsSearch,
  }) => {
    return (
      <label className="block">
        <input
          className="mr-2"
          type="checkbox"
          value={value}
          name={name}
          checked={filter[value]}
          onChange={(e) => onCollectorFilter(e.target.value, e.target.name)}
        />
        {label}
      </label>
    )
  }

  return (
    <>
      <div className="mb-4">
        <input
          aria-label="Find a data collector"
          type="text"
          onChange={(e) => onCollectorSearch(e.target.value)}
          placeholder="Find a data collector"
          className="block w-full mb-2 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded- dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
        <div className="border border-gray-100 mb-2 p-2 rounded">
          <span className="block text-xs uppercase tracking-wide font-medium mb-1">Type</span>
          <Checkbox value="os" name="type" label="OS" />
          <Checkbox value="hardware" name="type" label="Hardware" />
          <Checkbox value="containers" name="type" label="Containers" />
          <Checkbox value="service" name="type" label="Service" />
          <Checkbox value="application" name="type" label="Application" />
        </div>
        <div className="border border-gray-100 mb-2 p-2 rounded">
          <span className="block text-xs uppercase tracking-wide font-medium mb-1">Category</span>
          <Checkbox value="memory" name="category" label="Memory" />
        </div>
        <div className="border border-gray-100 mb-2 p-2 rounded">
          <span className="block text-xs uppercase tracking-wide font-medium mb-1">
            Orchestrator
          </span>
          <Checkbox value="go.d.plugin" name="orchestrator" label="go.d.plugin (Go)" />
          <Checkbox value="internal" name="orchestrator" label="Internal (C)" />
          <Checkbox value="python.d.plugin" name="orchestrator" label="python.d.plugin (Python)" />
          <Checkbox value="node.d.plugin" name="orchestrator" label="node.d.plugin (Node.JS)" />
          <Checkbox value="bash.d.plugin" name="orchestrator" label="bash.d.plugin (Bash)" />
        </div>
      </div>
    </>
  )
}

const SidebarDocs = ({ SidebarDocsCloud }) => {
  const [SidebarDocsCloudOn, SidebarDocsSwitch] = useState(SidebarDocsCloud)

  const onSidebarSwitch = () => {
    SidebarDocsSwitch((status) => {
      return !status
    })
  }

  const SidebarDocsOptions = [
    { value: 'default', label: 'Netdata' },
    { value: 'cloud', label: 'Netdata Cloud' },
  ]

  return (
    <>
      <div className="mb-4">
        <span className="uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">
          Choose a product:
        </span>
        <Select
          options={SidebarDocsOptions}
          defaultValue={SidebarDocsCloud ? SidebarDocsOptions[1] : SidebarDocsOptions[0]}
          onChange={onSidebarSwitch}
        />
      </div>
      {SidebarDocsCloudOn ? (
        <SidebarItems sidebar={SidebarDocsData[1]} />
      ) : (
        <SidebarItems sidebar={SidebarDocsData[0]} />
      )}
    </>
  )
}

const Sidebar = ({ SidebarType, SidebarDocsCloud, CollectorsSearch, FilterCollectors }) => {
  const router = useRouter()

  // Mobile toggle for the sidebar.
  const [sidebarShow, setSidebarShow] = useState(false)
  const onToggleSidebar = () => {
    setSidebarShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  // Pass collector filtering back to the parent page.
  const FilterCollectorsResult = (filterString) => {
    FilterCollectors(filterString)
  }

  const CollectorsSearchResult = (string) => {
    // console.log(string)
    CollectorsSearch(string)
  }

  return (
    <>
      <button
        onClick={onToggleSidebar}
        className="lg:hidden z-50 fixed bottom-4 right-4 w-14 h-14 p-3 bg-salmon rounded-full"
      >
        <BsBookHalf className="w-full h-full" />
      </button>
      <div
        id="sidebar"
        className={`fixed z-40 inset-0 flex-none h-full w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block ${
          sidebarShow ? 'block bg-gray-900 bg-opacity-30' : 'hidden'
        }`}
      >
        <div
          id="nav-wrapper"
          className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky bg-white lg:bg-transparent overflow-hidden top-32 bg-white mr-24 lg:mr-0"
        >
          <nav id="nav" className="overflow-y-auto pt-16 lg:pt-0 px-6 lg:pl-0 lg:pr-4 sm:pb-10">
            <ul className="mb-8">
              <li className="py-1.5">
                <CustomLink
                  href="/docs"
                  className={`flex items-center text-gray-700 hover:text-erin dark:text-gray-100 font-medium ${
                    router.asPath.includes('/docs') ? 'bg-erin bg-opacity-10 font-semibold' : ''
                  }`}
                >
                  <div className="inline-block bg-erin p-1 mr-2 rounded-sm">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 2.4C2.72 2.4 2.5 2.62 2.5 2.9C2.5 3.18 2.72 3.4 3 3.4C3.28 3.4 3.5 3.18 3.5 2.9C3.5 2.62 3.28 2.4 3 2.4ZM4.5 2.4C4.22 2.4 4 2.62 4 2.9C4 3.18 4.22 3.4 4.5 3.4C4.78 3.4 5 3.18 5 2.9C5 2.62 4.78 2.4 4.5 2.4ZM11.23 0.5H2.77C1.52 0.5 0.5 1.52 0.5 2.77V9.22C0.5 10.47 1.52 11.49 2.77 11.49H11.22C12.47 11.49 13.49 10.47 13.49 9.22V2.77C13.5 1.52 12.48 0.5 11.23 0.5ZM12 9.23C12 9.66 11.65 10 11.23 10H2.77C2.34 10 2 9.65 2 9.23V5.25H12V9.23ZM12 3.75H2V2.77C2 2.34 2.35 2 2.77 2H11.22C11.65 2 11.99 2.35 11.99 2.77V3.75H12Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  Documentation
                </CustomLink>
              </li>
              <li className="py-1.5">
                <CustomLink
                  href="/tutorials"
                  className={`flex items-center text-gray-700 hover:text-salmon dark:text-gray-100 font-medium ${
                    router.asPath == '/tutorials' ? 'bg-salmon bg-opacity-10 font-semibold' : ''
                  }`}
                >
                  <div className="inline-block bg-salmon p-1 mr-2 rounded-sm">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 2.75H7.5V4.25H10C10.83 4.25 11.5 3.58 11.5 2.75ZM10 5.25H7.5V6.75H8.5C9.33 6.75 10 6.08 10 5.25ZM5 0V6.75C5 7.71 4.21 8.5 3.25 8.5C2.29 8.5 1.5 7.71 1.5 6.75V3C1.5 2.72 1.72 2.5 2 2.5C2.28 2.5 2.5 2.72 2.5 3V6.75C2.5 7.16 2.84 7.5 3.25 7.5C3.66 7.5 4 7.16 4 6.75V3C4 1.9 3.1 1 2 1C0.9 1 0 1.9 0 3V6.75C0 8.54 1.46 10 3.25 10H10.75C12.54 10 14 8.54 14 6.75V0H5ZM12.5 6.75C12.5 7.71 11.71 8.5 10.75 8.5H6.5V1.5H12.5V6.75Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  Tutorials
                </CustomLink>
              </li>
              <li className="py-1.5">
                <CustomLink
                  href="/learn"
                  className={`flex items-center text-gray-700 hover:text-lilac dark:text-gray-100 font-medium ${
                    router.asPath.includes('/learn') ? 'bg-lilac bg-opacity-10 font-semibold' : ''
                  }`}
                >
                  <div className="inline-block bg-lilac p-1 mr-2 rounded-sm">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 2.75H7.5V4.25H10C10.83 4.25 11.5 3.58 11.5 2.75ZM10 5.25H7.5V6.75H8.5C9.33 6.75 10 6.08 10 5.25ZM5 0V6.75C5 7.71 4.21 8.5 3.25 8.5C2.29 8.5 1.5 7.71 1.5 6.75V3C1.5 2.72 1.72 2.5 2 2.5C2.28 2.5 2.5 2.72 2.5 3V6.75C2.5 7.16 2.84 7.5 3.25 7.5C3.66 7.5 4 7.16 4 6.75V3C4 1.9 3.1 1 2 1C0.9 1 0 1.9 0 3V6.75C0 8.54 1.46 10 3.25 10H10.75C12.54 10 14 8.54 14 6.75V0H5ZM12.5 6.75C12.5 7.71 11.71 8.5 10.75 8.5H6.5V1.5H12.5V6.75Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  Learn
                </CustomLink>
              </li>
              <li className="py-1.5">
                <CustomLink
                  href="/collectors"
                  className={`flex items-center text-gray-700 hover:text-indigo dark:text-gray-100 font-medium ${
                    router.asPath.includes('/collectors')
                      ? 'bg-indigo bg-opacity-10 font-semibold'
                      : ''
                  }`}
                >
                  <div className="inline-block bg-indigo p-1 mr-2 rounded-sm">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 2.75H7.5V4.25H10C10.83 4.25 11.5 3.58 11.5 2.75ZM10 5.25H7.5V6.75H8.5C9.33 6.75 10 6.08 10 5.25ZM5 0V6.75C5 7.71 4.21 8.5 3.25 8.5C2.29 8.5 1.5 7.71 1.5 6.75V3C1.5 2.72 1.72 2.5 2 2.5C2.28 2.5 2.5 2.72 2.5 3V6.75C2.5 7.16 2.84 7.5 3.25 7.5C3.66 7.5 4 7.16 4 6.75V3C4 1.9 3.1 1 2 1C0.9 1 0 1.9 0 3V6.75C0 8.54 1.46 10 3.25 10H10.75C12.54 10 14 8.54 14 6.75V0H5ZM12.5 6.75C12.5 7.71 11.71 8.5 10.75 8.5H6.5V1.5H12.5V6.75Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  Data collectors
                </CustomLink>
              </li>
            </ul>

            {(() => {
              switch (SidebarType) {
                case 'docs':
                  return <SidebarDocs CloudOn={SidebarDocsCloud} />
                case 'tutorials':
                  return <div>These are tutorials.</div>
                case 'learn':
                  return <div>This is the academy.</div>
                case 'collectors':
                  return (
                    <SidebarCollectors
                      CollectorsSearchCallback={CollectorsSearchResult}
                      FilterCollectorsCallback={FilterCollectorsResult}
                    />
                  )
              }
            })()}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar
