export default function PageTitle({ children }) {
  return (
    <h1
      dangerouslySetInnerHTML={{ __html: children }}
      className="text-4xl lg:text-8xl font-display font-bold leading-9 tracking-wide text-gray-800"
    />
  )
}
