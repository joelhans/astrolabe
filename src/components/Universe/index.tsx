import React, { useState, useRef, useEffect, FC, useLayoutEffect } from 'react'
import moment from 'moment'
import { IoClose, IoTelescopeOutline } from 'react-icons/io5'
import Image from 'next/image'
import StarscapeData from '@data/stars.json'
import { Post, StarLink } from '@/types/content'
import {
  createAsterisms,
  createLines,
  createLinks,
  createNames,
  createStars,
  createUniverse,
  createStarscape,
  xScale,
  yScale,
} from './createUniverse'
import { highlight, resetHighlight } from './highlight'

const getVisitedPosts = (posts: Post[]): Post[] => {
  // Set the `visitedStars` cookie to an empty array if there is no localStorage
  // already, then set it to be used here and on individual stars.
  const savedStars = localStorage.getItem('visitedStars')
  const visitedStars = savedStars ? JSON.parse(savedStars) : new Array()
  localStorage.setItem('visitedStars', JSON.stringify(visitedStars))

  // Mutate the `posts` array to include a `visited` attribute for any star that
  // our user has already visited, which is stored in cookies.
  return posts.map((post) => {
    if (visitedStars.some((star: any) => star.slug === post.slug)) {
      post.visited = true
    }
    return post
  })
}

const Universe: FC<{ posts: Post[] }> = ({ posts: incomingPosts }) => {
  const [tooltipData, setTooltipData] = useState<Post | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState('-right-full')
  const closeTooltip = () => {
    setTooltipStyle('-right-full')
    setTimeout(() => {
      resetHighlight()
      setTooltipData(null)
    }, 150)
  }
  useEffect(() => {
    if (tooltipData) {
      setTimeout(() => {
        setTooltipStyle('right-0')
      }, 150)
    }
  }, [tooltipData])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const scatterRef = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (scatterRef.current) {
      createStarscape(scatterRef.current)
    }
  }, [scatterRef])

  const asterismRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (asterismRef.current) {
      const posts = getVisitedPosts(incomingPosts)
      const universe = createUniverse(asterismRef.current)
      const asterisms = createAsterisms(posts)
      const links = createLinks(posts)
      const stars = createStars(universe, posts, setTooltipData)
      createLines(stars, links)
      createNames(stars, asterisms)
    }
  }, [asterismRef, incomingPosts])

  return (
    <>
      <div className="universe bg-gray-900">
        <div className="relative">
          <svg className="absolute" ref={scatterRef}></svg>
        </div>
        <div className="asterisms">
          <svg ref={asterismRef} onClick={closeTooltip}>
            <defs>
              <radialGradient id="black-hole">
                <stop offset="85%" stopColor="rgba(0,0,0,1)" />
                <stop offset="92%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <radialGradient id="white">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,1)" />
              </radialGradient>
            </defs>
          </svg>
          {tooltipData && (
            <div
              ref={tooltipRef}
              className={`absolute bottom-0 md:top-0 ${tooltipStyle} block w-full md:h-screen md:w-4/12 lg:3/12 flex flex-col justify-center text-xl !text-gray-900 p-8 lg:p-12 bg-gray-100 rounded-sm transition-all ease-in-out`}
            >
              <button
                className="absolute top-6 right-6 font-sans font-medium text-3xl"
                onClick={closeTooltip}
              >
                <IoClose />
              </button>
              <div>
                <h2 className="text-3xl lg:text-3xl 2xl:text-4xl font-serif font-bold mb-6">
                  {tooltipData?.title}
                </h2>
                {tooltipData?.author && (
                  <p className="text-base 2xl:text-lg font-sans font-medium mb-6">
                    Materialized by{' '}
                    <span className="text-pink font-bold">{tooltipData?.author}</span> on{' '}
                    {moment(tooltipData?.publishedOn).format('dddd, MMMM Do YYYY')}.
                  </p>
                )}
                {tooltipData?.summary && (
                  <p className="prose md:prose-lg 2xl:prose-2xl italic">{tooltipData?.summary}</p>
                )}
                {tooltipData?.artworkUrl && (
                  <div className="blur-sm block relative max-h-64 overflow-hidden mt-6">
                    <Image src={tooltipData?.artworkUrl} width={400} height={200} alt="TODO" />
                  </div>
                )}
                <a
                  ref={tooltipLinkRef}
                  href={tooltipData?.slug}
                  aria-label={tooltipData?.title}
                  className="inline-block w-auto px-4 py-3 font-sans text-base lg:text-lg font-medium text-white mt-6 bg-gradient-to-tr from-[#0d1c48] to-[#0f062d] rounded-sm transition-all ease-in-out hover:brightness-150"
                >
                  Take a look{` `}
                  <IoTelescopeOutline className="inline w-4 h-4 ml-1 text-gray-100" />
                </a>
                {tooltipData?.visited && (
                  <p className="text-sm lg:text-base text-pink font-sans font-medium mt-8">
                    You've visited this star before.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Universe
