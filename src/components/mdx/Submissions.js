import moment from 'moment'

const FreePaid = ({ paid, date }) => {
  const closeDate = Date.parse(date)

  return (
    <div className="border px-12 -mx-12">
      <p className="text-3xl font-bold">
        {paid ? (
          <>
            <em>Astrolabe</em> is currently open to year-round submissions for a $3 fee. See below
            for details.
          </>
        ) : (
          <>
            <em>Astrolabe</em> is currently open to free submissions until{' '}
            {moment(closeDate).format('dddd, MMMM Do YYYY,')} at 9am Pacific time.
          </>
        )}
      </p>
    </div>
  )
}

const Guidelines = ({ paid, closed, dateFreeOpen, dateFreeClose }) => {
  return (
    <>
      {closed && 
        <>
          <p>We are temorarily <strong>closed</strong> to submissions. Our next free submission period is open between{' '}
            {moment(dateFreeOpen).format('dddd, MMMM Do')} and{' '}
            {moment(dateFreeClose).format('dddd, MMMM Do, YYYY')}.</p>
        </>
      }
      {paid & !!closed ? (
        <>
          <p>
            We are currently open to <strong>paid submissions with a $3 fee</strong>. If you&rsquo;d
            prefer to not pay a fee, our next free submission period is open between{' '}
            {moment(dateFreeOpen).format('dddd, MMMM Do')} and{' '}
            {moment(dateFreeClose).format('dddd, MMMM Do, YYYY')}.
          </p>
          <p>To send a paid submission:</p>
          <ol>
            <li>
              <span className="block mb-2">
                Send your submission to{' '}
                <a href="mailto:editors@astrolabe.ooo">editors@astrolabe.ooo</a> with the following
                subject line, replacing the parts in green:
              </span>
              <strong className="block mb-2">
                Paid submission: <span className="text-green">Your Name</span>, &ldquo;
                <span className="text-green">Title</span>&rdquo;
              </strong>
              <span className="block mb-2">
                Include a short cover letter, bio, and your work as an attachment(s).
              </span>
              <span>
                We welcome pen names, author names, or pseudonyms. No need to include your legal
                name, physical address, phone number, or other personal information with your
                submission&mdash;the name you publish under and your email address is enough!
              </span>
            </li>
            <li>
              <span className="block mb-2">
                Click the <strong>PayPal</strong> button below to pay the $3 fee.
              </span>
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="QK55QUNYBVRJY" />
                <input
                  className="px-4 py-3 border rounded hover:bg-gray-200 transition-all"
                  type="image"
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
                  border="0"
                  name="submit"
                  alt="PayPal - The safer, easier way to pay online!"
                />
              </form>
            </li>
            <li>
              We&rsquo;ll send a confirmation to let you know we received your submission and fee.
            </li>
          </ol>
          <p>
            We&rsquo;ll get back to you within <strong>three months</strong>&mdash;if we take
            longer, it typically means we&rsquo;re seriously considering your work, but you can
            always feel free to query us:{' '}
            <a href="mailto:editors@astrolabe.ooo">editors@astrolabe.ooo</a>. We&rsquo;re strong
            believers that Wednesday is the least painful day of the week to send (or receive) a
            rejection.
          </p>
        </>
      ) : ( null )}
      {!!paid && !!closed ? (
        <>
          <p>
            We are currently <strong>open</strong> for free submissions until{' '}
            {moment(dateFreeClose).format('dddd, MMMM Do, YYYY')}!
          </p>
          <ol>
            <li>
              <span className="block mb-2">
                Send your submission to{' '}
                <a href="mailto:editors@astrolabe.ooo">editors@astrolabe.ooo</a> with the following
                subject line, replacing the parts in green:
              </span>
              <strong className="block mb-2">
                Submission: <span className="text-green">Your Name</span>, &ldquo;
                <span className="text-green">Title</span>&rdquo;
              </strong>
              <span className="block mb-2">
                Include a short cover letter, bio, and your work as an attachment(s).
              </span>
              <span>
                We welcome pen names, author names, or pseudonyms. No need to include your legal
                name, physical address, phone number, or other personal information with your
                submission&mdash;the name you publish under and your email address is enough!
              </span>
            </li>
          </ol>
          <p>
            We&rsquo;ll get back to you within <strong>three months</strong>&mdash;if we take
            longer, it typically means we&rsquo;re seriously considering your work, but you can
            always feel free to query us:{' '}
            <a href="mailto:editors@astrolabe.ooo">editors@astrolabe.ooo</a>. We&rsquo;re strong
            believers that Wednesday is the least painful day of the week to send (or receive) a
            rejection.
          </p>
        </>
      ) : ( null )}
    </>
  )
}

export { FreePaid, Guidelines }
