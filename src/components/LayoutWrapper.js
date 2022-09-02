import { useRouter } from 'next/router'
import Nav from './Nav'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 w-full mx-auto">
          <Nav />
          {router.asPath === '/' ? (
            <main>{children}</main>
          ) : (
            <main className="ml-32">
              <div className="max-w-screen-lg mx-auto mb-auto px-12">{children}</div>
            </main>
          )}
        </div>
      </div>
    </>
  )
}

export default LayoutWrapper
