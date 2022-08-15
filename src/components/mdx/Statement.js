const Statement = ({ children, color = 'sea' }) => {
  return (
    <p className={`text-xl sm:text-2xl lg:text-3xl font-medium text-${color} leading-normal`}>
      {children}
    </p>
  )
}

export default Statement
