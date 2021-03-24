import Link from '@components/Link'
import Tag from '@components/Tag'
import siteMetadata from '@data/siteMetadata'
import Sidebar from '@components/Sidebar'
import { useState } from 'react'

export default function DocsLayout({ title }) {
  return (
    <>
      <div className="flex mt-12">
        <Sidebar />
        <div className="min-w-0 w-full flex flex-auto lg:static lg:max-h-full lg:overflow-visible">
          <article className="w-full ml-8">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-12 md:mb-20">
              {title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
              <div className="relative bg-erin rounded-sm shadow-md">
                <Link href="/docs/get-started" className="group relative block px-6 py-8">
                  <a>
                    <h2 className="w-full uppercase text-sm font-medium text-black mb-4">Documentation</h2>
                    <p className="text-xl text-gray-900 font-medium mb-4 text-shadow-md">A description of what you get goes here.</p>
                    <span className="inline-block text-base font-medium bg-gray-100 bg-opacity-50 px-1.5 py-1 rounded-sm group-hover:bg-opacity-90">Get started</span>
                  </a>
                </Link>
              </div>
              <div className="relative bg-salmon rounded-sm shadow-md">
                <Link href="/tutorials" className="group relative block px-6 py-8">
                  <a>
                    <h2 className="w-full uppercase text-sm font-medium text-black mb-4">Tutorials</h2>
                    <p className="text-xl text-gray-900 font-medium mb-4 text-shadow-md">A description of what you get goes here.</p>
                    <span className="inline-block text-base font-medium bg-gray-100 bg-opacity-50 px-1.5 py-1 rounded-sm group-hover:bg-opacity-90">Follow a tutorial</span>
                  </a>
                </Link>
              </div>
              <div className="relative bg-lilac rounded-sm shadow-md">
                <Link href="/academy" className="group relative block px-6 py-8">
                  <a>
                    <h2 className="w-full uppercase text-sm font-medium text-black mb-4">Academy</h2>
                    <p className="text-xl text-gray-900 font-medium mb-4 text-shadow-md">A description of what you get goes here.</p>
                    <span className="inline-block text-base font-medium bg-gray-100 bg-opacity-50 px-1.5 py-1 rounded-sm group-hover:bg-opacity-90">Start learning</span>
                  </a>
                </Link>
              </div>
              <div className="relative bg-indigo rounded-sm shadow-md">
                <Link href="/screencasts" className="group relative block px-6 py-8">
                  <a>
                    <h2 className="w-full uppercase text-sm font-medium text-black mb-4">Screencasts</h2>
                    <p className="text-xl text-gray-900 font-medium mb-4 text-shadow-md">A description of what you get goes here.</p>
                    <span className="inline-block text-base font-medium bg-gray-100 bg-opacity-50 px-1.5 py-1 rounded-sm group-hover:bg-opacity-90">Watch along</span>
                  </a>
                </Link>
              </div>
          </div>
          <div className="flex mt-24">
            <h2 className="text-xl sm:text-2xl lg:text-3xl leading-none font-bold tracking-tight text-gray-800 dark:text-gray-100 mb-8 sm:mb-10">What's new in Netdata?</h2>
          </div>
          </article>
        </div>
      </div>
    </>
  )
}
