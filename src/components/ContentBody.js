export default function ContentBody({ children, prose = true }) {
  console.log('hi')

  return (
    <div
      className={`${prose == false ? '' : 'prose prose-lg dark:prose-dark'} max-w-none pt-10 pb-8`}
    >
      {children}
    </div>
  )
}
