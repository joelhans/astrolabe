export default function PageTitle({ children }) {
  return (
    <h1 className="text-2xl font-display font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14 mb-8">
      {children}
    </h1>
  )
}
