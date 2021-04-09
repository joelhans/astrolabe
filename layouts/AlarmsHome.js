import { useState } from 'react'
import PageWrapper from '@components/PageWrapper'
import ContentWrapper from '@components/ContentWrapper'
import ContentHeader from '@components/ContentHeader'
import ContentBody from '@components/ContentBody'
import ContentFooter from '@components/ContentFooter'
import Link from '@components/Link'
import Sidebar from '@components/Sidebar'
import Alarms from '@data/Alarms.json'

export default function AlarmsLayout({ title }) {
  const [searchValue, setSearchValue] = useState('')

  console.log(Alarms)

  // const filteredAlarms = Alarms.filter((alarm) => {
  //   const searchContent = alarm.name + alarm.on + alarm.info
  //   return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  // })

  return (
    <>
      <PageWrapper>
        <Sidebar SidebarType="learn" />
        <ContentWrapper>
          <ContentHeader title={title} />
          <ContentBody prose={false}>
            <ul>
              {Alarms.map((alarm) => (
                <li key={alarm.name}>
                  <Link href={`/learn/alarms/${alarm.name}`}>
                    <code>{alarm.name}</code>
                  </Link>
                </li>
              ))}
            </ul>
          </ContentBody>
        </ContentWrapper>
      </PageWrapper>
    </>
  )

  // return (
  //   <>
  //     <div className="divide-y">
  //       <div className="pt-6 pb-8 space-y-2 md:space-y-5">
  //         <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
  //           {title}
  //         </h1>
  //         <div className="relative max-w-lg">
  //           <input
  //             aria-label="Search articles"
  //             type="text"
  //             onChange={(e) => setSearchValue(e.target.value)}
  //             placeholder="Search articles"
  //             className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
  //           />
  //           <svg
  //             className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  //             />
  //           </svg>
  //         </div>
  //       </div>
  //       <ul>
  //        <li>hi</li>
  //       </ul>
  //     </div>
  //   </>
  // )
}
