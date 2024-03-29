'use client'

import { usePathname } from 'next/navigation'
import Nav from '@components/Nav'
import PageFooter from '@components/PageFooter'

const LayoutWrapper = ({ className, children }) => {
  return (
    <>
      <div
        className={`flex flex-col h-screen justify-between ${
          usePathname() === '/' && 'overflow-hidden'
        } ${className}`}
      >
        <Nav />
        {usePathname() === '/' ? (
          <main className="bg-gray-900">{children}</main>
        ) : (
          <>
            <main className="lg:ml-32">
              <div className="max-w-screen-lg mx-auto mb-auto px-12">{children}</div>
            </main>
            <PageFooter />
          </>
        )}
      </div>
    </>
  )
}

export default LayoutWrapper
