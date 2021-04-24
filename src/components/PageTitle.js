export default function PageTitle({ children }) {
  return (
    <h1 className="text-3xl font-display font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
      {children}
    </h1>
  )
}
