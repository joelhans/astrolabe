import '@/css/tailwind.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import { Ibarra_Real_Nova } from 'next/font/google'
const ibarra = Ibarra_Real_Nova({
  // weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ibarra',
})

import { Raleway } from 'next/font/google'
const raleway = Raleway({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
})

import LayoutWrapper from '@components/LayoutWrapper'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper className={`${ibarra.variable} ${raleway.variable}`}>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
