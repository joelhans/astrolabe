'use client'

import React, { useState, useRef, useEffect, FC } from 'react'
import * as d3 from 'd3'
import moment from 'moment'
import { IoClose, IoTelescopeOutline } from 'react-icons/io5'
import Image from 'next/image'
import { 
  Asterism,
  Post, 
  StarLink 
} from '@/types/content'
import {
  createUniverse, 
  xScale, 
  yScale, 
  createAsterisms, 
  createLinks, 
  createStars,
  createNames, 
  createLines, 
  createStarscape
} from './initUniverse'
import { 
  removeHighlight, 
  addHighlight 
} from './highlight'

// Pull localStorage data to determine which stars the client has visited
// before. This is used in small areas of the Universe, like displaying a small
// notifciation on the tooltip.
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

  // Establish the tooltip's state and style. The data itself comes from the
  // `createStars` function in `initUniverse.tsx`.
  const [tooltipData, setTooltipData] = useState<Post | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState('-right-full')
  const closeTooltip = () => {
    setTooltipStyle('-right-full')
    setTimeout(() => {
      removeHighlight(null)
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

  const asterismRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipLinkRef = useRef<HTMLAnchorElement>(null)  

  useEffect(() => {
    if (asterismRef.current) {
      // When running Astrolabe on a development server, this cleans up existing
      // SVGs so that you don't get annoying duplicates that require a hard
      // refresh to clean up, which is amazing.
      d3.selectAll('div.asterisms svg g').remove()
      
      // Create the universe via `initUniverse.ts`.
      const posts = getVisitedPosts(incomingPosts)
      const universe = createUniverse(asterismRef.current, setTooltipData)
      const asterisms = createAsterisms(posts)
      const links = createLinks(posts)
      const stars = createStars(universe, posts, setTooltipData)
      createNames(universe, stars, asterisms)
      createLines(universe, links)
      createStarscape(universe)
    }
  }, [asterismRef, incomingPosts])

  return (
    <>
      <div className="bg-gray-900">
        <div className="asterisms relative z-20">
          <svg ref={asterismRef} />
        </div>
        {tooltipData && (
        <div
          ref={tooltipRef}
          className={`tooltipScatter absolute z-30 bottom-0 md:top-0 ${
            tooltipStyle
          } block w-full md:h-screen md:w-4/12 lg:3/12 flex flex-col justify-center text-xl !text-gray-900 p-8 lg:p-12 bg-gray-100 rounded-sm transition-all ease-in-out`}
        >
          <div>
            <h2
              className="text-3xl lg:text-3xl 2xl:text-4xl font-serif font-bold mb-6"
              dangerouslySetInnerHTML={{ __html: tooltipData?.title }}
            />
            {tooltipData?.author && (
              <p className="text-base 2xl:text-lg font-sans font-medium mb-6">
                Materialized by <span className="text-pink font-bold">{tooltipData?.author}</span>{' '}
                on {moment(tooltipData?.publishedOn).format('dddd, MMMM Do YYYY')}.
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
            <button className="font-sans text-base lg:text-lg font-medium text-white mt-6 bg-gradient-to-tr from-[#0d1c48] to-[#0f062d] rounded-sm transition-all ease-in-out hover:brightness-150">
              <a href={tooltipData?.slug} className="block px-4 py-3">
                Take a look{` `}
                <IoTelescopeOutline className="inline w-4 h-4 ml-1 text-gray-100" />
              </a>
            </button>
            {tooltipData?.visited && (
              <p className="text-sm lg:text-base text-pink font-sans font-medium mt-8">
                You've visited this star before.
              </p>
            )}
          </div>
          <button
            className="absolute top-6 right-6 font-sans font-medium text-3xl hover:fill-pink"
            onClick={closeTooltip}
          >
            <IoClose />
          </button>
        </div>
        )}
      </div>
    </>
  )
}

export default Universe
