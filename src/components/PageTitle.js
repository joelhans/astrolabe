export default function PageTitle({ children }) {
  return (
    <h1 className="text-3xl lg:text-4xl font-display font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  )
}
