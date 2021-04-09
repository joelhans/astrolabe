import React, { useState } from 'react'
import CustomLink from '@components/Link'
import PageWrapper from '@components/PageWrapper'
import ContentWrapper from '@components/ContentWrapper'
import ContentHeader from '@components/ContentHeader'
import ContentBody from '@components/ContentBody'
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

  // Getting updated state from Sidebar.
  const SearchCallback = (filter) => setSearchValue(filter)
  const FilterCallback = (filter) => setFilterValue(filter)

  // Parsing out the state from Sidebar into something we can search/filter
  // CollectorsData with.
  let searchString = searchValue || ''
  let filterObj = Object.keys(filterValue).filter((id) => {
    return filterValue[id]
  })

  // Filter integrations based on both the search and filtering.
  const filteredCollectors = CollectorsData.filter((data) => {
    const searchContent = data.name + data.slug + data.type
    const isActiveSearch =
      searchString.length > 0
        ? searchContent.toLowerCase().includes(searchString.toLowerCase())
        : true
    const isActiveFilter =
      Object.keys(filterObj).length > 0 ? filterObj.join(' ').includes(data.layer) : true

    const filterType = data.type ? data.type : ''
    const filterCategory = data.category ? data.category.join(' ') : ''
    const filterOrchestrator = data.orchestrator ? data.orchestrator : ''
    const filterContent =
      data.layer + ' ' + filterType + ' ' + filterCategory + ' ' + filterOrchestrator

    return isActiveSearch && isActiveFilter
  })

  return (
    <>
      <PageSeo
        title={`Integrations`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/integrations`}
      />
      <PageWrapper>
        <Sidebar
          SidebarType="collectors"
          CollectorsSearch={SearchCallback}
          FilterCollectors={FilterCallback}
        />
        <ContentWrapper>
          <ContentHeader title="Integrations" />
          <ContentBody prose={false}>
            <div className="grid gap-8 grid-cols-3">
              {filteredCollectors.map((collector, idx) => (
                <>
                  <div key={collector.slug} className="border border-gray-200 rounded shadow-md">
                    <CustomLink
                      href={''}
                      className="flex flex-col justify-start w-full h-full p-4 group"
                    >
                      <div className="w-full flex items-center mb-4">
                        <Icon
                          name={collector.slug}
                          fill={collector.fill}
                          className="w-12 h-12 group-hover:w-16"
                          alt={collector.name}
                        />
                        <h2 className="block text-lg font-medium ml-4 group-hover:text-erin group-hover:folt-bold">
                          {collector.name}
                        </h2>
                      </div>
                      <div className="text-left">
                        <p className="inline-block text-left text-salmon uppercase tracking-wide text-xs font-semibold px-1 py-0.5 bg-salmon bg-opacity-5 rounded">
                          {collector.layer}
                        </p>
                        {collector.type && (
                          <p className="inline-block text-left text-erin uppercase tracking-wide text-xs font-semibold px-1 py-0.5 bg-erin bg-opacity-5 rounded">
                            {collector.type}
                          </p>
                        )}
                        {collector.category && (
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
                        )}
                      </div>
                    </CustomLink>
                  </div>
                </>
              ))}
            </div>
          </ContentBody>
        </ContentWrapper>
      </PageWrapper>
    </>
  )
}
