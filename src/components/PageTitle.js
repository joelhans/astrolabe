export default function PageTitle({ children }) {
  return (
    <h1 className="text-5xl lg:text-8xl font-display font-bold leading-9 tracking-wide text-gray-100">
      {children}
    </h1>
  )
}
