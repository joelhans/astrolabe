import React, { useState } from 'react'
import CustomLink from '@components/Link'
import Sidebar from '@components/Sidebar'
import { PageSeo } from '@components/SEO'
import siteMetadata from '@data/siteMetadata'
import CollectorsData from '@data/Collectors'

const Icon = ({ name, ...rest }) => {
  const ImportedIconRef = React.useRef(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (
          await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!./images/${name}.svg`)
        ).default
      } catch (err) {
        ImportedIconRef.current = (
          await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!./images/default.svg`)
        ).default
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name])

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef
    return <ImportedIcon {...rest} />
  }

  return null
}

export default function Collectors() {
  const [searchValue, setSearchValue] = useState('')
  const [filterValue, setFilterValue] = useState({})

  // console.log(SearchCallback)

  // Getting updated state from Sidebar.
  const SearchCallback = (filter) => setSearchValue(filter)
  const FilterCallback = (filter) => setFilterValue(filter)

  // console.log(searchValue)

  // Parsing out the state from Sidebar into something we can filter CollectorsData with.
  let filterString = searchValue || ''
  // console.log(filterString)
  // const keys = Object.keys(searchValue)
  // let activeKeys = keys.filter(function(id) {
  //   return searchValue[id]
  // })

  // const filteredCollectors = CollectorsData
  const filteredCollectors = CollectorsData.filter((data) => {
    const searchContent = data.name + data.slug + data.type + data.category.join(' ')
    return searchContent.toLowerCase().includes(filterString.toLowerCase())
  })

  // const filteredCollectors = CollectorsData(search, searchValue)

  // function search(user) {
  //   return Object.keys(this).every((key) => user[key] === this[key]);
  // }

  return (
    <>
      <PageSeo
        title={`Data collectors`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/collector`}
      />
      <div className="flex mt-12 px-6">
        <Sidebar
          SidebarType="collectors"
          CollectorsSearch={SearchCallback}
          FilterCollectors={FilterCallback}
        />
        <div className="min-w-0 w-full flex flex-auto lg:static lg:max-h-full lg:overflow-visible">
          <article className="w-full ml-8">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-12 md:mb-20">
              Data collectors
            </h1>
            <div className="grid gap-8 grid-cols-3">
              {filteredCollectors.map((collector, idx) => (
                <>
                  <div key={collector.slug} className="border border-gray-200 rounded shadow-md">
                    <CustomLink href={''} className="flex flex-wrap w-full h-full p-4 group-hover">
                      <div className="w-full flex items-center mb-4">
                        <Icon
                          name={collector.slug}
                          fill={collector.fill}
                          className="w-12 h-12 group-hover:w-16"
                          alt={collector.name}
                        />
                        <h2 className="block text-lg font-medium ml-4">{collector.name}</h2>
                      </div>
                      <div className="text-left">
                        <p className="inline-block text-left text-erin uppercase tracking-wide text-xs font-semibold px-1 py-0.5 bg-erin bg-opacity-5 rounded">
                          {collector.type}
                        </p>
                        <p>
                          {collector.category.map((cat, idx, arr) => (
                            <span
                              key={cat}
                              className={`uppercase text-lilac tracking-wide text-xs font-semibold px-1 py-0.5 bg-lilac bg-opacity-5 rounded ${
                                idx == arr.length - 1 && arr.length > 1 ? 'ml-1' : ''
                              }`}
                            >
                              {cat}
                            </span>
                          ))}
                        </p>
                      </div>
                    </CustomLink>
                  </div>
                </>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
