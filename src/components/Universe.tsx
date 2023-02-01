import React, { useState, useRef, useEffect, FC } from 'react'
import * as d3 from 'd3'
import moment from 'moment'
import { IoTelescopeOutline } from 'react-icons/io5'
import Image from 'next/image'
import StarscapeData from '@data/stars.json'
import { Asterism, Post, StarLink } from '@/types/content'

function drawScatter(
  scatterRef: SVGSVGElement,
  tooltipRef: HTMLDivElement,
  setTooltipState: (b: boolean) => void,
  setTooltipData: (d: Post) => void,
  posts: Post[]
) {
  // Set the `visitedStars` cookie to an empty array if there is no localStorage
  // already, then set it to be used here and on individual stars.
  const savedStars = JSON.parse(localStorage.getItem('visitedStars') ?? '')
  let visitedStars: any[] = []
  if (savedStars) {
    visitedStars = savedStars
  } else {
    localStorage.setItem('visitedStars', JSON.stringify(visitedStars))
  }

  // Find the last universe position, if it exists, which we use use to set the
  // x, y, and scale of the Universe itself.
  const savedPosition = JSON.parse(localStorage.getItem('universePosition') ?? '')
  let universePosition = {
    x: 0,
    y: 0,
    k: 0,
  }
  if (savedPosition) {
    universePosition = {
      x: savedPosition.x ?? 0,
      y: savedPosition.y ?? 0,
      k: savedPosition.k ?? 0,
    }
  }

  // Set a fixed width/height to prevent different screen sizes (or changing
  // screen sizes) from altering the shape of the asterisms.
  const winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    width = 4000,
    height = 4000

  let isMobile = winWidth < 768,
    xx = universePosition.x ?? isMobile ? -250 : -300,
    yy = universePosition.y ?? isMobile ? 200 : -75,
    scale = universePosition.k ?? isMobile ? 0.2 : 0.3

  // Create the SVG container, set its dimensions, and initiate zoom+pan.
  const svg = d3
    .select(scatterRef)
    .attr('width', width)
    .attr('height', height)
    .call(
      d3.zoom<SVGSVGElement, unknown>().transform,
      d3.zoomIdentity.translate(xx, yy).scale(scale)
    )
    .call(
      d3.zoom<SVGSVGElement, unknown>().on('zoom', () => {
        svg.attr('transform', d3.event.transform)
      })
    )
    .append('g')
    .attr('transform', `translate(${xx}, ${yy}) scale(${scale})`)

  // On mobile, this allows you to click the background and un-highlight the current star.
  d3.select('#scatter svg').on('click', function () {
    doNotHighlight()
    setTooltipState(false)
  })

  // Create our scatter plot axes.
  const x = d3.scaleLinear().domain([-10, 10]).range([0, width])
  const y = d3.scaleLinear().domain([-10, 10]).range([height, 0])

  // Generate the Starscape.
  // And the star "generator".
  // const particles = d3.range(1000).map(function(i) {
  //   return [Math.random() * 20 * (Math.round(Math.random()) ? 1 : -1), Math.random() * 20 * (Math.round(Math.random()) ? 1 : -1)];
  // })
  // console.log(JSON.stringify(particles))
  const colors = ['#F94144', '#4D908E', '#f59e0b', '#F9C74F', '#c026d3', '#059669', '#4D908E']
  const starscape = svg
    .selectAll('scapePoints')
    .data(StarscapeData)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d[0]) ?? 0)
    .attr('cy', (d) => y(d[1]) ?? 0)
    .attr('r', '2')
    .attr('fill', (d) => colors[Math.floor(Math.random() * colors.length)])
    .attr('fill-opacity', '50%')

  // Group our `posts` object by the asterisms we've already defined and remove
  // any that aren't part of an asterism (aka `key` = `null`).
  const asterisms = d3
    .nest()
    .key((d: any) => d.asterism)
    .entries(posts)
    .filter((d) => d.key !== 'null')

  // Mutate the `posts` array to include a `visited` attribute for any star that
  // our user has already visited, which is stored in cookies.
  posts.forEach(function (e) {
    if (visitedStars.some((f: any) => f.slug === e.slug)) {
      e.visited = true
    }
  })

  // Build a list of links using {source: x, target: y} syntax.
  const links = posts
    .filter((post) => !!post.linkedTo)
    .reduce((acc, { asterism, id, declination, ascension, linkedTo }) => {
      // Loop through all linkedTo targets to support multiple
      const links: StarLink[] =
        linkedTo?.map((link) => ({
          asterism: asterism,
          source: id.split('/')[0],
          sourceX: x(declination ?? 0),
          sourceY: y(ascension ?? 0),
          target: link,
          targetX: x(posts?.find((x) => x.id === link)?.declination ?? 0),
          targetY: y(posts?.find((x) => x.id === link)?.ascension ?? 0),
        })) ?? []
      return [...acc, ...links]
    }, [] as StarLink[])

  // Function to highlight a specific star or an asterism of stars. The function
  // automatically makes all stars smaller upon mouseover on any star. Then,
  // depending on whether or not it's part of an asterism, it either highlights
  // the asterism or just the single star.
  const highlight = function (d: Post) {
    // Highlight the star you're hovered over.
    d3.selectAll('.' + d.slug)
      .filter('.star')
      .transition()
      .duration(200)
      .attr('fill', d.gradient ? `url(#white)` : '#fff')

    if (d.asterism) {
      // Highlight the lines between the stars of the chosen asterism.
      d3.selectAll(d.asterism && '.' + d.asterism)
        .filter('.line')
        .transition()
        .duration(200)
        .attr('stroke-opacity', '100%')

      // Highlight the name of the chosen asterism.
      d3.selectAll(d.asterism && '.' + d.asterism)
        .filter('.name')
        .transition()
        .duration(200)
        .attr('fill', '#059669')
        .attr('fill-opacity', '100%')
    } else if (d.key) {
      // Highlight stars of the asterism when you hover over an asterism.
      d3.selectAll('.' + d.key)
        .filter('.star')
        .transition()
        .duration(200)
        .attr('fill', '#fff')

      // Highlight the lines between the stars of the chosen asterism.
      d3.selectAll('.' + d.key)
        .filter('.line')
        .transition()
        .duration(200)
        .attr('stroke-opacity', '100%')

      // Highlight the name of the chosen asterism.
      d3.selectAll('.' + d.key)
        .filter('.name')
        .transition()
        .duration(200)
        .attr('fill', '#059669')
        .attr('fill-opacity', '100%')
    }
  }

  // Function to reset highlighting.
  const doNotHighlight = function () {
    d3.selectAll('circle')
      .filter('.star')
      .transition()
      .duration(200)
      .attr('r', (d: any) => (d.size ? d.size : 20))
      .attr('fill', (d: any) =>
        d.visited ? '#666' : d.gradient ? `url(#${d.gradient})` : d.color ? d.color : '#69b3a2'
      )
    d3.selectAll('line').transition().duration(200).attr('stroke-opacity', '0%')
    d3.selectAll('text').transition().duration(200).attr('fill', '#fff').attr('fill-opacity', '20%')
  }

  // Function to show the tooltip.
  const tooltipShow = function (d: Post) {
    setTooltipState(true)
    setTooltipData(d)
  }

  // Draw lines between the stars of an asterism.
  const lines = svg
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('class', (d) => 'line ' + d.asterism)
    .attr('x1', (d) => d.sourceX ?? 0)
    .attr('y1', (d) => d.sourceY ?? 0)
    .attr('x2', (d) => d.targetX ?? 0)
    .attr('y2', (d) => d.targetY ?? 0)
    .attr('stroke-width', 2)
    .attr('stroke', '#D3D3D3')
    .attr('stroke-opacity', '0%')

  // Create the asterism name.
  const names = svg
    .selectAll('asterismNames')
    .data(asterisms)
    .enter()
    .append('text')
    .attr('class', (d) => 'name ' + d.values[0].asterism + ' font-serif')
    .text((d) => d.values[0]?.asterismFull)
    .attr('x', function (d) {
      // Calculate the average X position of all the stars in this asterism.
      const width = this.getComputedTextLength()
      const max = Math.max(...d.values.map((o: any) => o.declination)),
        min = Math.min(...d.values.map((o: any) => o.declination)),
        mid = (max + min) / 2
      return (x(mid) ?? 0) - width * 2
    })
    .attr('y', function (d) {
      // Calculate the average Y position of all the stars in this asterism.
      const height = this.getBoundingClientRect().height
      const max = Math.max(...d.values.map((o: any) => o.ascension)),
        min = Math.min(...d.values.map((o: any) => o.ascension)),
        mid = (max + min) / 2
      return (y(mid) ?? 0) + 40
    })
    .attr('fill', '#fff')
    .attr('font-size', '7rem')
    .attr('font-style', 'italic')
    .attr('fill-opacity', '20%')
    .on('mouseover', function (d: any) {
      highlight(d)
    })
    .on('mouseout', function () {
      doNotHighlight()
    })

  // Create the stars.
  const stars = svg
    .selectAll('scatterPoints')
    .data(posts)
    .enter()
    .append('a')
    .attr('href', (d: Post) => d.id)
    .append('circle')
    .attr('class', (d: Post) => 'star ' + d.asterism + ' ' + d.slug)
    .attr('cx', (d: Post) => x(d.declination ?? 0) ?? 0)
    .attr('cy', (d) => y(d['ascension'] ?? 0) ?? 0)
    .attr('r', (d) => d.size ?? 20)
    .attr('fill', (d) =>
      d.visited ? '#666' : d.gradient ? `url(#${d.gradient})` : d.color ? d.color : '#69b3a2'
    )
    .on('mouseover', function (d) {
      highlight(d)
    })
    .on('mouseout', function () {
      doNotHighlight()
    })
    .on('click', function (d) {
      doNotHighlight()
      d3.event.preventDefault()
      d3.event.stopPropagation()
      highlight(d)
      tooltipShow(d)
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
    })
    .on('touchstart', function (d) {
      doNotHighlight()
      d3.event.preventDefault()
      d3.event.stopPropagation()
      highlight(d)
      tooltipShow(d)
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
    })
}

const Universe: FC<{ posts: Post[] }> = ({ posts }) => {
  const scatterRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const [tooltipState, setTooltipState] = useState(false)
  const [tooltipData, setTooltipData] = useState<any | null>(null)

  const closeTooltip = () => {
    setTooltipState(false)
  }

  useEffect(() => {
    if (scatterRef.current && tooltipRef.current) {
      drawScatter(scatterRef.current, tooltipRef.current, setTooltipState, setTooltipData, posts)
    }
    document.body.style.overflow = 'hidden'
  }, [posts, scatterRef, tooltipRef])

  return (
    <>
      <div id="scatter" className="bg-gray-900">
        <svg ref={scatterRef}>
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
        <div
          ref={tooltipRef}
          className={`tooltipScatter absolute bottom-0 md:top-0 ${
            tooltipState ? `right-0` : `-right-full`
          } block w-full md:h-screen md:w-4/12 lg:3/12 flex flex-col justify-center text-xl !text-gray-900 p-8 lg:p-12 bg-gray-100 rounded-sm transition-all ease-in-out`}
        >
          <div>
            <p className="text-3xl lg:text-3xl 2xl:text-4xl font-serif font-bold mb-6">
              {tooltipData.title}
            </p>
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
            className="absolute top-6 right-6 font-sans font-medium text-3xl"
            onClick={closeTooltip}
          >
            x
          </button>
        </div>
      </div>
    </>
  )
}

export default Universe
