import Image from 'next/image'
import CustomLink from './Link'
import OneLineInstall from '@components/mdx/OneLineInstall'
import CloudRequired from '@components/mdx/CloudRequired'

const MDXComponents = {
  OneLineInstall,
  CloudRequired,
  Image,
  a: CustomLink,
}

export default MDXComponents
