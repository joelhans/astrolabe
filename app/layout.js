import '@/css/tailwind.css'

import siteMetadata from '@data/siteMetadata'
import LayoutWrapper from '@components/LayoutWrapper'

import { Ibarra_Real_Nova } from 'next/font/google'
import { Raleway } from 'next/font/google'

// import { Metadata } from 'next'

const ibarra = Ibarra_Real_Nova({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ibarra',
})

const raleway = Raleway({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
})

export const metadata = {
  title: {
    template: '%s • Astrolabe',
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibarra.variable} ${raleway.variable} scroll-smooth`}>
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/index.xml" />
      <body className="antialiased font-serif font-normal bg-gray-50 text-gray-800">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
