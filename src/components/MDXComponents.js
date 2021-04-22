import Image from 'next/image'
import CustomLink from './Link'
import CodeBlock from '@components/mdx/CodeBlock'

const MDXComponents = {
  Image,
  a: CustomLink,
  pre: CodeBlock,
}

export default MDXComponents
