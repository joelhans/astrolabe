import { React, useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import moment from 'moment'
import { IoTelescopeOutline } from 'react-icons/io5'
import Image from 'next/image'
import Router from 'next/router'
import StarscapeData from '@data/stars.json'

function drawScatter(scatterRef, tooltipRef, setTooltipState, setTooltipData, posts) {
  // Set the `visitedStars` cookie to an empty array if there is no localStorage
  // already, then set it to be used here and on individual stars.
  const visitedStars = JSON.parse(localStorage.getItem('visitedStars')) || new Array()
  !visitedStars && localStorage.setItem('visitedStars', JSON.stringify(visitedStars))

  // Find the last universe position, if it exists, which we use use to set the
  // x, y, and scale of the Universe itself.
  const universePosition = JSON.parse(localStorage.getItem('universePosition'))

  // Set a fixed width/height to prevent different screen sizes (or changing
  // screen sizes) from altering the shape of the asterisms.
  const winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    width = 4000,
    height = 4000

  let isMobile = winWidth < 768,
    xx = universePosition ? universePosition.x : isMobile ? -250 : -300,
    yy = universePosition ? universePosition.y : isMobile ? 200 : -75,
    scale = universePosition ? universePosition.k : isMobile ? 0.2 : 0.3

  // Create the SVG container, set its dimensions, and initiate zoom+pan.
  const svg = d3
    .select(scatterRef.current)
    .attr('width', width)
    .attr('height', height)
    .call(d3.zoom().transform, d3.zoomIdentity.translate(xx, yy).scale(scale))
    .call(
      d3.zoom().on('zoom', () => {
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
  const Starscape = svg
    .selectAll('scapePoints')
    .data(StarscapeData)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d[0]))
    .attr('cy', (d) => y(d[1]))
    .attr('r', '2')
    .attr('fill', '#444')

  // Group our `posts` object by the asterisms we've already defined and remove
  // any that aren't part of an asterism (aka `key` = `null`).
  const Asterisms = d3
    .nest()
    .key((d) => {
      return d.asterism
    })
    .entries(posts)
    .filter((d) => d.key !== 'null')

  // Mutate the `posts` array to include a `visited` attribute for any star that
  // our user has already visited, which is stored in cookies.
  posts.forEach(function (e) {
    if (visitedStars.some((f) => f.slug === e.slug)) {
      e.visited = true
    }
  })

  // Build a list of links using {source: x, target: y} syntax.
  const Links = posts
    .filter((post) => {
      if (post.linkedTo[0]) {
        return true
      } else {
        return false
      }
    })
    .reduce((a, { asterism, id, declination, ascension, linkedTo }) => {
      // Loop through all linkedTo targets to support multiple links.
      linkedTo.map((link) => {
        a.push({
          asterism: asterism,
          source: id.split('/')[0],
          sourceX: x(declination),
          sourceY: y(ascension),
          target: link,
          targetX: x(posts.find((x) => x.id === link).declination),
          targetY: y(posts.find((x) => x.id === link).ascension),
        })
      })
      return a
    }, [])

  // Initialize the tooltip.
  const tooltipScatter = d3.select('.tooltipScatter')

  // Function to highlight a specific star or an asterism of stars. The function
  // automatically makes all stars smaller upon mouseover on any star. Then,
  // depending on whether or not it's part of an asterism, it either highlights
  // the asterism or just the single star.
  const highlight = function (d) {
    // Highlight the star you're hovered over.
    d3.selectAll('.' + d.slug)
      .filter('.star')
      .transition()
      .duration(200)
      .attr('fill', '#fff')

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

  const center = function (d) {
    console.log(x(d.declination), y(d.ascension))
    // svg.attr('transform', `translate(${x(d.declination)}, ${y(d.ascension)})`)
    svg.call(d3.zoom().transform, d3.zoomIdentity.translate(x(d.declination), y(d.ascension)))
  }

  // Function to reset highlighting.
  const doNotHighlight = function () {
    d3.selectAll('circle')
      .filter('.star')
      .transition()
      .duration(200)
      .attr('r', (d) => (d.size ? d.size : 20))
      .attr('fill', (d) => (d.visited ? '#444' : d.color ? d.color : '#69b3a2'))
    d3.selectAll('line').transition().duration(200).attr('stroke-opacity', '0%')
    d3.selectAll('text').transition().duration(200).attr('fill', '#fff').attr('fill-opacity', '20%')
  }

  // Function to show the tooltip.
  const tooltipShow = function (d) {
    setTooltipState(true)
    setTooltipData(d)
  }

  // Draw lines between the stars of an asterism.
  const lines = svg
    .selectAll('line')
    .data(Links)
    .enter()
    .append('line')
    .attr('class', (d) => 'line ' + d.asterism)
    .attr('x1', (d) => d.sourceX)
    .attr('y1', (d) => d.sourceY)
    .attr('x2', (d) => d.targetX)
    .attr('y2', (d) => d.targetY)
    .attr('stroke-width', 2)
    .attr('stroke', '#D3D3D3')
    .attr('stroke-opacity', '0%')

  // Create the asterism name.
  const names = svg
    .selectAll('asterismNames')
    .data(Asterisms)
    .enter()
    .append('text')
    .attr('class', (d) => 'name ' + d.values[0].asterism)
    .text(function (d) {
      return `${d.values[0].asterismFull}`
    })
    .attr('x', function (d) {
      // Calculate the average X position of all the stars in this asterism.
      const width = this.getComputedTextLength()
      const max = Math.max(...d.values.map((o) => o.declination)),
        min = Math.min(...d.values.map((o) => o.declination)),
        mid = (max + min) / 2
      return x(mid) - width * 2
    })
    .attr('y', function (d) {
      // Calculate the average Y position of all the stars in this asterism.
      const height = this.getBoundingClientRect().height
      const max = Math.max(...d.values.map((o) => o.ascension)),
        min = Math.min(...d.values.map((o) => o.ascension)),
        mid = (max + min) / 2
      return y(mid) + 40
    })
    .attr('fill', '#fff')
    .attr('font-size', '5rem')
    .attr('font-style', 'italic')
    .attr('fill-opacity', '20%')
    .on('mouseover', function (d) {
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
    .attr('href', function (d) {
      return d.id
    })
    .append('circle')
    .attr('class', (d) => 'star ' + d.asterism + ' ' + d.slug)
    .attr('cx', (d) => x(d['declination']))
    .attr('cy', (d) => y(d['ascension']))
    .attr('r', (d) => (d.size ? d.size : 20))
    .attr('fill', (d) => (d.visited ? '#444' : d.color ? d.color : '#69b3a2'))
    .on('mouseover', function (d) {
      highlight(d)
    })
    .on('click', function (d) {
      doNotHighlight()
      d3.event.preventDefault()
      d3.event.stopPropagation()
      // setSelectedStar(d)
      highlight(d)
      // center(d)
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

const Universe = ({ posts }) => {
  const scatterRef = useRef(null)
  const tooltipRef = useRef(null)

  const [tooltipState, setTooltipState] = useState(false)
  const [tooltipData, setTooltipData] = useState({})

  const closeTooltip = () => {
    setTooltipState(false)
  }

  useEffect(() => {
    drawScatter(scatterRef, tooltipRef, setTooltipState, setTooltipData, posts)
    document.body.style.overflow = 'hidden'
  }, [scatterRef, tooltipRef])

  return (
    <>
      <div id="scatter" className="bg-gray-900">
        <svg ref={scatterRef} />
        <div
          ref={tooltipRef}
          className={`tooltipScatter absolute bottom-0 md:top-0 ${
            tooltipState ? `right-0` : `-right-full`
          } block w-full md:h-screen md:w-3/12 flex flex-col justify-center text-xl !text-gray-900 p-8 lg:p-12 bg-gray-100 rounded-sm transition-all ease-in-out`}
        >
          <div>
            <p className="text-3xl lg:text-3xl 2xl:text-4xl font-bold mb-4">{tooltipData.title}</p>
            <p className="text-base 2xl:text-lg font-sans font-medium mb-3">
              Materialized by <span className="text-pink font-bold">{tooltipData.author}</span> on{' '}
              {moment(tooltipData.publishedOn).format('dddd, MMMM Do YYYY')}.
            </p>
            {tooltipData.summary && (
              <p className="prose md:prose-lg 2xl:prose-2xl italic">{tooltipData.summary}</p>
            )}
            {tooltipData.artworkUrl && (
              <div className="blur-sm block relative max-h-64 overflow-hidden mt-3">
                <Image src={tooltipData.artworkUrl} width={400} height={200} />
              </div>
            )}
            <button className="font-sans text-base lg:text-lg font-medium text-gray-100 mt-4 bg-green hover:bg-pink rounded-sm transition-all ease-in-out">
              <a href={tooltipData.slug} className="block px-3 py-2">
                Take a look{` `}
                <IoTelescopeOutline className="inline w-4 h-4 ml-1 text-white" />
              </a>
            </button>
            {tooltipData.visited && (
              <p className="text-sm lg:text-base text-pink font-sans font-medium mt-4">
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
