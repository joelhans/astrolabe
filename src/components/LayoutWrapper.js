import Image from 'next/image'
import headerNavLinks from '@data/headerNavLinks'
import Link from './Link'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import RSS from './RSS'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 w-full mx-auto">
          <header className="z-40 lg:z-50 px-6 lg:mx-auto border-b border-gray-200">
            <div className="flex items-center align-center justify-between py-4 mx-auto">
              <div className="flex-1 justify-start">
                <Link href="/" aria-label="Joel Hans">
                  <div className="flex items-center justify-start">
                    <Image
                      width={48}
                      height={48}
                      src="/static/images/joel.jpg"
                      className="rounded-full"
                      alt="Joel Hans"
                    />
                    <div className="text-2xl font-display text-sea font-bold mx-3 hover:text-steel">
                      Joel Hans
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex-1 lg:flex lg:items-center justify-center mt-1.5">
                <div className="hidden sm:block">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="text-gray-500 dark:text-gray-400 text-xl font-medium sm:p-4 hover:text-sea dark:hover:text-sea transition-all"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex justify-end items-center flex-1">
                <ThemeSwitch />
                <RSS />
                <MobileNav />
                <button className="hidden md:block text-white text-base md:text-lg font-medium ml-8 py-3 px-6 bg-sea rounded-sm hover:bg-steel transition-all">
                  <Link href="https://nurse.media">
                    <span className="hidden lg:inline-block">Copy &amp; content consulting</span>
                    <span className="inline-block lg:hidden">Consulting</span>
                    {` `}&rarr;
                  </Link>
                </button>
              </div>
            </div>
          </header>
          <main className="max-w-screen-lg mx-auto mb-auto px-6">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default LayoutWrapper
