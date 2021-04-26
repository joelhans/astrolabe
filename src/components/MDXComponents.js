import Image from 'next/image'
import CustomLink from './Link'
import CodeBlock from '@components/mdx/CodeBlock'
import Video from '@components/mdx/Video'
// import Icon from '@components/mdx/Icon'

const MDXComponents = {
  Image,
  Video,
  // Icon,
  a: CustomLink,
  pre: CodeBlock,
}

export default MDXComponents
