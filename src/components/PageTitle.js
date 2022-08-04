export default function PageTitle({ children }) {
  return (
    <h1 className="text-4xl lg:text-6xl font-display font-bold leading-9 tracking-wide text-gray-100">
      {children}
    </h1>
  )
}
