import React, { useState } from 'react'

const SidenoteHeader = ({ children, onToggleNote }) => {
  return (
    <div className="prose prose-lg">
      {children}
      <button className="font-bold cursor-pointer" onClick={onToggleNote}>
        Read more &rarr;
      </button>
    </div>
  )
}

const SidenoteBody = ({ children, noteShow }) => {
  return <div className={`prose prose-lg ${noteShow ? 'block' : 'hidden'}`}>{children}</div>
}

const Sidenote = ({ children }) => {
  const [noteShow, setNoteShow] = useState(false)
  const onToggleNote = () => {
    setNoteShow((status) => {
      return !status
    })
  }

  return (
    <aside className="!w-full bg-sea bg-opacity-10 p-6 rounded">
      <SidenoteHeader onToggleNote={onToggleNote}>{children[0]}</SidenoteHeader>
      <SidenoteBody noteShow={noteShow}>{children[1]}</SidenoteBody>
    </aside>
  )
}

export default Sidenote
