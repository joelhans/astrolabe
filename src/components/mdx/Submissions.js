import moment from 'moment'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const FreePaid = ({ paid, date }) => {
  const closeDate = Date.parse(date)

  return (
    <div className="border px-12 -mx-12">
      <p className="text-3xl font-bold">
        {paid ? (
          <>
            <em>Astrolabe</em> is currently open to year-round submissions for a $5 fee. See below
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

const Guidelines = ({ paid }) => {
  return (
    <>
      {paid ? (
        <>
          <p>To send a paid submission:</p>
          <ol>
            <li>
              <span>
                Send your submission to{' '}
                <a href="mailto:editors@astrolabe.ooo">editors@astrolabe.ooo</a> with the subject
                line:
              </span>
              <br />
              <strong>Paid submission: Your Name, &ldquo;Title&rdquo;</strong>
              <br />
              <span>
                Include a short cover letter, bio, and your work as an attachment(s). No need to
                send us your physical address or phone number.
              </span>
            </li>
            <li>
              Click the <strong>PayPal</strong> button below to pay the $5 fee.
            </li>
          </ol>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="7PZ9LDC4Q7FB4" />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif"
              border="0"
              name="submit"
              alt="PayPal - The safer, easier way to pay online!"
            />
          </form>
          <p>We'll send a confirmation to let you know we received your submission and fee.</p>
        </>
      ) : (
        <>
          <p>
            Send submissions to <a href="mailto:editors@astrolabe.ooo">editors@astrolabe.ooo</a>.
          </p>
          <p>Please format the subject line like so: **Submission: Your Name, "Title"**</p>
          <p>
            Include a short cover letter, bio, and your work as an attachment(s). No need to send us
            your physical address or phone number.
          </p>
          <p>
            We&rsquo;ll get back to you within **one month**—if we take longer, feel free to{' '}
            <a href="mailto:editors@astrolabe.ooo">editors@astrolabe.ooo</a>. We're strong believers
            that Wednesday is the least painful day of the week to send (or receive) a rejection.
          </p>
        </>
      )}
    </>
  )
}

export { FreePaid, Guidelines }
