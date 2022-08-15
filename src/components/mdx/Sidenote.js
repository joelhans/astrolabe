import React, { useState } from 'react'
import { CgChevronDoubleRightR } from 'react-icons/cg'

const SidenoteHeader = ({ children, noteShow, onToggleNote }) => {
  return (
    <div className="prose prose-sm lg:prose-lg dark:prose-dark text-gray-700 dark:text-gray-400">
      {children}
      <button
        className={`relative flex align-center text-gray-700 dark:text-gray-400 font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-sea`}
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
    <div
      className={`prose prose-sm lg:prose-lg dark:prose-dark text-gray-700 dark:text-gray-400 ${
        noteShow ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
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
  // The fix below is temporary. If there's multiple children, but no `hr`, it
  // still breaks the first child from the others.
  let Header, Body
  if (children.length > 1) {
    const idx = children.map((el) => el.type).indexOf('hr')
    Header = children.slice(0, idx)
    Body = children.slice(idx + 1)
  } else {
    Body = children
  }

  return (
    <aside className="!w-full bg-sea bg-opacity-10 p-6 rounded">
      {Header && (
        <SidenoteHeader noteShow={noteShow} onToggleNote={onToggleNote}>
          {Header}
        </SidenoteHeader>
      )}
      <SidenoteBody noteShow={Header ? noteShow : true}>{Body}</SidenoteBody>
    </aside>
  )
}

export default Sidenote
