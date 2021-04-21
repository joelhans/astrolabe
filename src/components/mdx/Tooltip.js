const Tooltip = ({ children, size, alt }) => {
  const hoverFunction = () => {
    console.log('hover start')
  }

  return (
    <span onHover={hoverFunction} className="group relative bg-salmon rounded-lg px-2 py-1">
      {children}
      <span
        className={`${
          size && size
        } inline-block w-8 h-8 text-center font-mono ml-2 bg-gray-50 rounded-full`}
      >
        ?
      </span>
      <span className="opacity-0 block absolute left-2/4 transform -translate-x-1/2 top-full w-auto min-w-full max-w-64 text-sm text-center bg-salmon p-4 rounded-lg group-hover:opacity-100">
        {alt}
      </span>
    </span>
  )
}

export default Tooltip
