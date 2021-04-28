import Image from 'next/image'
import CustomLink from './Link'
import CodeBlock from '@components/mdx/CodeBlock'
import Sidenote from '@components/mdx/Sidenote'
import Video from '@components/mdx/Video'

const MDXComponents = {
  Image,
  Sidenote,
  Video,
  a: CustomLink,
  pre: CodeBlock,
}

export default MDXComponents
