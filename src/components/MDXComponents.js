import Image from 'next/image'
import CustomLink from './Link'
import CodeBlock from '@components/mdx/CodeBlock'
import Aside from '@components/mdx/Aside'
import ChecklistProvider from '@components/mdx/ChecklistProvider'
import Checklist from '@components/mdx/Checklist'
import Checkbox from '@components/mdx/Checkbox'
import Sidenote from '@components/mdx/Sidenote'
import Video from '@components/mdx/Video'
import SignUp from '@components/mdx/SignUp'

const MDXComponents = {
  Aside,
  Checkbox,
  Checklist,
  ChecklistProvider,
  Image,
  Sidenote,
  Video,
  SignUp,
  a: CustomLink,
  pre: CodeBlock,
}

export default MDXComponents
