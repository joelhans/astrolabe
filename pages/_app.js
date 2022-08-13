import '@/css/tailwind.css'

import * as React from 'react'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import LayoutWrapper from '@components/LayoutWrapper'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
