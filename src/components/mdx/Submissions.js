import moment from 'moment'

const Submissions = ({ state, date }) => {
  console.log(date)
  const close = Date.parse(date)
  console.log(close)

  return (
    <div className="border px-12 -mx-12">
      <p className="text-3xl font-bold">
        Free submissions are{' '}
        {state ? (
          <>
            <span className="text-green">open</span> until{' '}
            {moment(close).format('dddd, MMMM Do YYYY,')} at 9am Pacific time.
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
