export default function ContentBody({ children, prose = true }) {
  return (
    <div
      className={`${
        prose == false ? '' : 'prose lg:prose-lg dark:prose-dark'
      } max-w-none pt-10 pb-8`}
    >
      {children}
    </div>
  )
}
