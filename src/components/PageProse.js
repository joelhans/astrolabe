const PageProse = ({ className, children }) => {
  return (
    <div className={`${className} max-w-full prose prose-lg md:prose-xl lg:prose-2xl`}>
      {children}
    </div>
  )
}

export default PageProse
