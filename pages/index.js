import { React } from 'react'
import { BASE_CONTENT_PATH } from '@config/constants'
import siteMetadata from '@data/siteMetadata'
import { getFrontMatter } from '@lib/mdx'
import { PageSEO } from '@components/SEO'
import Universe from '@components/Universe'

export async function getStaticProps() {
  const posts = await getFrontMatter(BASE_CONTENT_PATH, true)
  return { props: { posts } }
}

<<<<<<< HEAD
=======
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState()
  const [timerShow, setTimerShow] = useState(false)

  const toggleTimer = () => {
    setTimerShow((status) => {
      localStorage.setItem('closedTimer', true)
      return !status
    })
  }

  const remainingTime = () => {
    const difference = +new Date('2022-12-21T10:00:00-07:00') - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  useEffect(() => {
    console.log(localStorage.getItem('closedTimer'))
    !localStorage.getItem('closedTimer') && setTimerShow(true)
    setTimeout(() => {
      setTimeLeft(remainingTime())
    }, 1000)
  })

  return (
    <>
      {timerShow && (
        <div className="z-30 absolute md:left-1/2 bottom-0 md:bottom-32 w-full md:max-w-lg lg:max-w-2xl text-center px-8 md:px-12 py-6 md:py-10 bg-white rounded transform lg:-translate-x-1/2">
          <button
            type="button"
            className="z-50 absolute w-6 h-6 top-2 right-2"
            aria-label="Toggle Menu"
            onClick={toggleTimer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`text-gray-900 hover:text-green transform ease-in-out duration-300 hover:cursor-pointer`}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <p className="font-serif text-xl md:text-2xl">
            A giant molecular cloud has formed. <em>Astrolabe</em>—a new literary magazine in the
            form of a dynamic universe, will materialize on the winter solstice.
          </p>
          {timeLeft ? (
            <div className="mt-4 md:mt-8 max-w-md mx-auto">
              <div className="grid grid-cols-4">
                <div className="absolute">
                  <div className="text-2xl md:text-4xl">-</div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl">{timeLeft.days}</div>
                  <div className="text-sm font-sans font-medium">days</div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl">{timeLeft.hours}</div>
                  <div className="text-sm font-sans font-medium">hours</div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl">{timeLeft.minutes}</div>
                  <div className="text-sm font-sans font-medium">minutes</div>
                </div>
                <div>
                  <div className="text-2xl md:text-4xl">{timeLeft.seconds}</div>
                  <div className="text-sm font-sans font-medium">seconds</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="block h-16 mt-4 md:mt-8" />
          )}
        </div>
      )}
    </>
  )
}

>>>>>>> 0799bf3 (Migrate to new Nextjs 13 font loader)
export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Universe posts={posts} />
    </>
  )
}
