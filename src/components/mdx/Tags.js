export const Tags = ({ children }) => {
  return <div className="flex flex-wrap !-mt-4">{children}</div>
}

export const Tag = ({ children }) => {
  return (
    <span className="Tag block text-sm lg:text-base text-gray-500 italic font-semibold mr-4">
      {children}
    </span>
  )
}
