const Submissions = ({ state }) => {
  return (
    <div className="border px-12 -mx-12">
      <p className="text-3xl font-bold">
        Submissions are currently{' '}
        {state ? (
          <>
            <span className="text-green">open</span>
            <span>.</span>
          </>
        ) : (
          <>
            <span className="text-pink">closed</span>
            <span>.</span>
          </>
        )}
      </p>
    </div>
  )
}

export default Submissions
