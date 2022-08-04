import MobileNav from './MobileNav'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 w-full mx-auto">
          <MobileNav />
          {/* <h1 className="navTitle z-100 absolute bottom-0 text-gray-100 font-serif text-title font-bold italic tracking-wide">Astersomething</h1> */}
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

export default LayoutWrapper
