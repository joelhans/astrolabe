export default function PageTitle({ children }) {
  return (
    <h1
      dangerouslySetInnerHTML={{ __html: children }}
      className="text-gray-800 text-6xl lg:text-8xl font-display font-bold leading-9 tracking-wide"
    />
  )
}
