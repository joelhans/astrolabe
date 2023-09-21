import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      return !status
    })
  }

  return (
    <header className="fixed z-50">
      <button
        type="button"
        className="z-50 relative w-8 h-8 mt-4 lg:mt-12 ml-4 lg:ml-12"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`text-green lg:text-gray-100 hover:text-sea transform ease-in-out duration-300 ${
            navShow ? '!text-gray-100' : ''
          }`}
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>
      <div
        className={`clip overflow-hidden z-20 fixed top-0 left-0 w-16 lg:w-32 h-screen bg-green lg:!translate-x-0 ${
          navShow ? 'translate-x-0' : '-translate-x-full'
        }`}
      />
      <div
        className={`overflow-hidden z-10 fixed w-screen lg:w-auto h-screen bg-white top-0 left-0 pl-16 lg:pl-32 transform ease-in-out duration-300 ${
          navShow ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed w-full h-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <nav className="relative z-50 w-full h-full pt-8 pl-8 lg:pl-16 pr-0 lg:pr-24">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="py-4">
              <Link
                href={link.href}
                className="font-serif text-3xl lg:text-4xl italic tracking-wide text-gray-900 hover:text-green transform ease-in-out duration-300"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
          <div className="mt-8">
            <h3 className="text-lg lg:text-xl italic">Elsewhere:</h3>
            <Link
              className="block font-sans font-medium hover:text-pink transform ease-in-out duration-300 mt-2"
              href="https://twitter.com/ooo_astrolabe"
            >
              Twitter
            </Link>
            <Link
              className="block font-sans font-medium hover:text-pink transform ease-in-out duration-300 mt-2"
              href="https://www.instagram.com/ooo_astrolabe/"
            >
              Instagram
            </Link>
            <Link
              rel="me"
              className="block font-sans font-medium hover:text-pink transform ease-in-out duration-300 mt-2"
              href="https://bsky.app/profile/astrolabe.ooo"
            >
              Bluesky
            </Link>
            <Link
              className="block font-sans font-medium hover:text-pink transform ease-in-out duration-300 mt-2"
              href="https://duotrope.com/listing/35081/astrolabe"
            >
              Duotrope
            </Link>
            <Link
              className="block font-sans font-medium hover:text-pink transform ease-in-out duration-300 mt-2"
              href="https://www.chillsubs.com/magazine/astrolabe"
            >
              Chill Subs
            </Link>
            <Link
              className="block font-sans font-medium hover:text-pink transform ease-in-out duration-300 mt-2"
              href="https://thegrinder.diabolicalplots.com/Market/Index?id=15162"
            >
              The Submission Grinder
            </Link>
          </div>
        </nav>
        <h1 className="-translate-x-full">Astrolabe</h1>
      </div>
    </header>
  )
}

export default MobileNav
