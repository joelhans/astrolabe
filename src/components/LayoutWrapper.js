import headerNavLinks from '@data/headerNavLinks'
import Link from './Link'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import RSS from './RSS'

const LayoutWrapper = ({ children }) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <header className="z-40 lg:z-50 px-6 lg:mx-auto">
        <div className="flex items-center justify-center lg:justify-between flex-wrap py-8 mx-auto">
          <div className="">
            <Link href="/" aria-label="Tailwind CSS Blog">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-display text-erin font-bold mr-3">Joel Hans</div>
              </div>
            </Link>
          </div>
          <div className="flex-grow lg:flex lg:items-center lg:w-auto ml-8">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="px-1 text-gray-900 text-lg font-medium sm:p-4 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center w-auto lg:w-1/4 justify-end">
            <ThemeSwitch />
            <RSS />
            <MobileNav />
          </div>
        </div>
      </header>
      <main className="mb-auto px-6">{children}</main>
      <Footer />
    </div>
  )
}

export default LayoutWrapper
