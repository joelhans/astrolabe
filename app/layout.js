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
  metadataBase: new URL(siteMetadata.siteUrl),
  icons: {
    icon: '/static/favicons/favicon-32x32.png',
    shortcut: '/static/favicons/favicon-512x512.png',
    apple: '/static/favicons/apple-touch-icon.png',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 628,
        alt: siteMetadata.description,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: siteMetadata.siteUrl,
    creator: '@astrolabe',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibarra.variable} ${raleway.variable} scroll-smooth`}>
      <body className="antialiased font-serif font-normal bg-gray-50 text-gray-800">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
