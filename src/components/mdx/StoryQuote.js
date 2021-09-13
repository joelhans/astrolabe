const StoryQuote = ({ children, story }) => {
  return (
    <div className="flex items-center w-full bg-sea bg-opacity-5 p-6 rounded">
      <div className="!m-0">
        <p className="text-2xl leading-relaxed m-0 italic">{children}</p>
        <p>&mdash; &ldquo;{story}&rdquo;</p>
      </div>
    </div>
  )
}

export default StoryQuote
