import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from 'next/image'
import CustomLink from '@components/Link'
import Masthead from '@components/mdx/Masthead'
import Break from '@components/mdx/Break'
import Artwork from '@components/mdx/Artwork'
import Submissions from '@components/mdx/Submissions'

export const MDXComponents = {
  Image,
  a: CustomLink,
  Masthead,
  Break,
  Artwork,
  Submissions,
}

export const MDXLayoutRenderer = ({ mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout components={MDXComponents} {...rest} />
}
