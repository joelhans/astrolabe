const StoryQuote = ({ children, story }) => {
  return (
    <div className="flex items-center w-full bg-sea bg-opacity-5 p-12 rounded">
      <div className="!m-0">
        <p className="text-3xl font-serif leading-relaxed !m-0 italic">{children}</p>
        <p className="!mb-0">&mdash; &ldquo;{story}&rdquo;</p>
      </div>
    </div>
  )
}

export default StoryQuote
