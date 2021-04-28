const Callout = ({ emoji, children }) => {
  return (
    <div className="flex items-center w-full bg-salmon bg-opacity-10 p-6 rounded">
      <span className="mr-6">{emoji}</span>
      <div className="prose">
        <p>{children}</p>
      </div>
    </div>
  )
}

export default Callout
