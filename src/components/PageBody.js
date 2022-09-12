const PageBody = ({ children }) => {
  return (
    <div className="flex flex-row flex-wrap items-start mt-16 lg:mt-32 mb-32 lg:mb-48">
      <div className="meta-content prose lg:prose-2xl">{children}</div>
    </div>
  )
}

export default PageBody
