import Image from 'next/image'
import CustomLink from './Link'
import OneLineInstall from '@components/mdx/OneLineInstall'
import CloudRequired from '@components/mdx/CloudRequired'
import Highlight from '@components/Highlight'

const MDXComponents = {
  OneLineInstall,
  CloudRequired,
  Image,
  a: CustomLink,
  // code: Highlight,
}

export default MDXComponents
