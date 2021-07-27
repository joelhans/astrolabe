import Image from 'next/image'
import CustomLink from './Link'
import CodeBlock from '@components/mdx/CodeBlock'
import Aside from '@components/mdx/Aside'
import Checkbox from '@components/mdx/Checkbox'
import Sidenote from '@components/mdx/Sidenote'
import Video from '@components/mdx/Video'
import SignUp from '@components/mdx/SignUp'

const MDXComponents = {
  Aside,
  Checkbox,
  Image,
  Sidenote,
  Video,
  SignUp,
  a: CustomLink,
  pre: CodeBlock,
}

export default MDXComponents
