export default function ContentWrapper({ children }) {
  return (
    <article
      id="content-wrapper"
      className="min-w-0 w-full flex flex-auto flex-col lg:static lg:max-h-full lg:overflow-visible lg:mx-6"
    >
      {children}
    </article>
  )
}
