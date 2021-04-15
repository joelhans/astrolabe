import Image from 'next/image'
import CustomLink from './Link'
import OneLineInstall from '@components/mdx/OneLineInstall'
import CloudRequired from '@components/mdx/CloudRequired'
import CodeBlock from '@components/mdx/CodeBlock'

const MDXComponents = {
  OneLineInstall,
  CloudRequired,
  Image,
  a: CustomLink,
  pre: CodeBlock,
}

export default MDXComponents
