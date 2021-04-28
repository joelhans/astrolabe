import React, { useState } from 'react'
import { CgChevronDoubleRightR } from 'react-icons/cg'

const SidenoteHeader = ({ children, noteShow, onToggleNote }) => {
  return (
    <div className="prose prose-sm lg:prose-lg">
      {children}
      <button
        className={`relative flex align-center font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-sea ${
          noteShow ? 'hidden' : ''
        }`}
        onClick={onToggleNote}
      >
        Read more
        <CgChevronDoubleRightR
          className={`transform block relative w-8 h-8 fill-current text-steel ml-2 transition-all ${
            noteShow ? 'rotate-90' : ''
          }`}
        />
      </button>
    </div>
  )
}

const SidenoteBody = ({ children, noteShow }) => {
  return (
    <div className={`prose prose-sm lg:prose-lg ${noteShow ? 'block' : 'hidden'}`}>{children}</div>
  )
}

const Sidenote = ({ children }) => {
  const [noteShow, setNoteShow] = useState(false)
  const onToggleNote = () => {
    setNoteShow((status) => {
      return !status
    })
  }

  // Split the `children` array at the `hr` element, which I use to separate the
  // content that shows by default versus the content that's hidden in the
  // collapsible portion. Those are then passed to the appropriate components.
  //
  // TODO: Does this work when there's no `hr`?
  const idx = children.map((el) => el.props.mdxType).indexOf('hr')
  const Header = children.slice(0, idx)
  const Body = children.slice(idx + 1)

  // let Header, Body

  // if ( children.length > 1 ) {
  //   const idx = children.map((el) => el.props.mdxType).indexOf('hr')
  //   Header = children.slice(0, idx)
  //   Body = children.slice(idx + 1)
  // } else {
  //   Header = []
  //   Body = children
  // }

  return (
    <aside className="!w-full bg-sea bg-opacity-10 p-6 rounded">
      <SidenoteHeader noteShow={noteShow} onToggleNote={onToggleNote}>
        {Header}
      </SidenoteHeader>
      <SidenoteBody noteShow={noteShow}>{Body}</SidenoteBody>
    </aside>
  )
}

export default Sidenote
