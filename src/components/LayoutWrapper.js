import MobileNav from './MobileNav'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 w-full mx-auto">
          <MobileNav />
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

export default LayoutWrapper
