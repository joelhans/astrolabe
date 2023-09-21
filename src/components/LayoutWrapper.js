'use client'

import { useRouter } from 'next/navigation'
import Nav from '@components/Nav'
import PageFooter from '@components/PageFooter'

const LayoutWrapper = ({ className, children }) => {
  const router = useRouter()

  return (
    <>
      <div className={`flex flex-col h-screen ${className}`}>
        <div className="flex-1 w-full mx-auto">
          <Nav />
          {router.asPath === '/' ? (
            <main>{children}</main>
          ) : (
            <>
              <main className="lg:ml-32">
                <div className="max-w-screen-lg mx-auto mb-auto px-12">{children}</div>
              </main>
              <PageFooter />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default LayoutWrapper
