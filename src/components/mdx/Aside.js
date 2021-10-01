const Aside = ({ children }) => {
  return (
    <div className="flex items-center !w-full bg-sea bg-opacity-10 p-6 rounded">
      <div className="prose prose-md lg:prose-lg dark:prose-dark">{children}</div>
    </div>
  )
}

export default Aside
