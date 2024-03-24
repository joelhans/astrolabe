import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from 'next/image'
import Link from 'next/link'
import Masthead from '@components/mdx/Masthead'
import Break from '@components/mdx/Break'
import Artwork from '@components/mdx/Artwork'
import ContentWarning from '@components/mdx/ContentWarning'
import { Submissions, FreePaid, Guidelines } from '@components/mdx/Submissions'

export const MDXComponents = {
  Image,
  a: Link,
  Masthead,
  Break,
  Artwork,
  ContentWarning,
  Submissions,
  FreePaid,
  Guidelines,
}

export const MDXLayoutRenderer = ({ mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout components={MDXComponents} {...rest} />
}
