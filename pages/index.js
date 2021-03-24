import { PageSeo } from '@components/SEO'
import siteMetadata from '@data/siteMetadata'

export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div className="space-y-20 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="mt-24">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-8">
            Monitor everything in real-time.
          </h1>
          <p className="max-w-screen-lg text-lg md:text-2xl font-medium leading-9 text-gray-500 dark:text-gray-400 mb-8">
            A microscopic hardware, system, container, service, and application monitoring Agent for Linux servers. Open-source, free, preconfigured, opinionated, and always real-time.
          </p>
          <div class="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center">
            <button type="button" class="w-full sm:w-auto flex-none bg-gray-50 text-xl text-gray-400 hover:text-gray-900 font-mono leading-6 py-4 sm:px-6 border border-gray-200 rounded-sm flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
              <span class="text-gray-900">
                <span class="hidden sm:inline text-gray-500" aria-hidden="true">$ </span>
                bash &lt;(curl -Ss https://my-netdata.io/kickstart.sh)
              </span>
              <span class="sr-only">(click to copy to clipboard)</span>
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 16c0 1.886 0 2.828.586 3.414C9.172 20 10.114 20 12 20h4c1.886 0 2.828 0 3.414-.586C20 18.828 20 17.886 20 16v-4c0-1.886 0-2.828-.586-3.414C18.828 8 17.886 8 16 8m-8 8h4c1.886 0 2.828 0 3.414-.586C16 14.828 16 13.886 16 12V8m-8 8c-1.886 0-2.828 0-3.414-.586C4 14.828 4 13.886 4 12V8c0-1.886 0-2.828.586-3.414C5.172 4 6.114 4 8 4h4c1.886 0 2.828 0 3.414.586C16 5.172 16 6.114 16 8"></path></svg>
            </button>
            <a class="w-full sm:w-auto flex-none bg-green-500 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-4 px-6 border border-transparent rounded-sm focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200" href="/docs">Get started</a>
          </div>
        </div>
        <div className="">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl leading-none font-extrabold tracking-tight text-gray-800 mb-7 sm:mb-8">
            Metrics on the second, every second.
          </h2>
        </div>
      </div>

    </>
  )
}
