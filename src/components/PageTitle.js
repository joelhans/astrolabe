export default function PageTitle({ children }) {
  return (
    <h1 className="text-4xl lg:text-8xl font-display font-bold leading-9 tracking-wide text-gray-800">
      {children}
    </h1>
  )
}
