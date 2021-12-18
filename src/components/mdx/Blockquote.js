const Blockquote = ({ children }) => {
  return (
    <div className="flex items-center -ml-6 -mr-12 px-6">
      <div className="font-serif prose prose-lg lg:prose-2xl dark:prose-dark">{children}</div>
    </div>
  )
}

export default Blockquote
