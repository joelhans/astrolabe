import { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import moment from 'moment'
import Router from 'next/router'
import Image from 'next/image'
import StarscapeData from '@data/stars.json'

function drawScatter(scatterRef, tooltipRef, posts) {
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
    xx = universePosition ? universePosition.x : isMobile ? -250 : 0,
    yy = universePosition ? universePosition.y : isMobile ? 200 : 0,
    scale = universePosition ? universePosition.k : isMobile ? 0.2 : 0.4

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
    .attr('transform', `translate(${xx}, ${yy})scale(${scale})`)

  // On mobile, this allows you to click the background and un-highlight the current star.
  d3.select('#scatter').on('click', function () {
    doNotHighlight()
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

  // Function to reset highlighting.
  const doNotHighlight = function () {
    d3.selectAll('circle')
      .filter('.star')
      .transition()
      .duration(200)
      .attr('r', (d) => (d.size ? d.size : 8))
      .attr('fill', (d) => (d.visited ? '#444' : d.color ? d.color : '#69b3a2'))
    d3.selectAll('line').transition().duration(200).attr('stroke-opacity', '0%')
    d3.selectAll('text').transition().duration(200).attr('fill', '#fff').attr('fill-opacity', '20%')
    d3.select('.tooltipScatter').style('visibility', 'hidden')
  }

  // Function to show the tooltip.
  const tooltipShow = function (d) {
    tooltipScatter
      .html(
        `
        <p class="text-3xl lg:text-5xl font-bold mb-4">${d.title}</p>
        ${
          d.author
            ? `<p class="text-base lg:text-xl mb-3">Discovered by <span class="text-gray-100 font-bold">${
                d.author
              }</span> on ${moment(d.publishedOn).format('dddd, MMMM Do YYYY')}.</p>`
            : ``
        }
        ${d.summary ? `<p class="prose lg:prose-2xl italic mt-3">${d.summary}</p>` : ``}
        ${
          d.artworkUrl
            ? `<div class="blur-sm block relative mt-3"><Image class="" src="${d.artworkUrl}" width="400" height="2O0" /></div>`
            : ``
        }
        <button class="lg:hidden font-mono text-sm text-green mt-4 bg-gray-100 rounded">
          <a href="${d.slug}" class="block px-3 py-2">
            Explore &rarr;
          </a>
        </button>
        ${
          d.visited
            ? `<p class="text-xs lg:text-sm text-gray-100 font-mono font-bold mt-4">You've visited this star before.</p>`
            : ``
        }
      `
      )
      .style('visibility', 'visible')
  }

  const tooltipPosition = function (isMobile) {
    if (!isMobile) {
      // Account for the star position along the x axis in relationship to the
      // window's width so that we can place the tooltip on the correct side.
      d3.event.x + tooltipRef.current.offsetWidth < window.innerWidth
        ? tooltipScatter.style('left', d3.event.x + 30 + 'px')
        : tooltipScatter.style('left', d3.event.x - tooltipRef.current.offsetWidth - 30 + 'px')

      // Same for the y axis.
      d3.event.y + tooltipRef.current.offsetHeight < window.innerHeight
        ? tooltipScatter.style('top', d3.event.y - 10 + 'px')
        : tooltipScatter.style('top', d3.event.y - tooltipRef.current.offsetHeight + 10 + 'px')
    } else {
      tooltipScatter.style('left', 0).style('bottom', '0')
    }
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
    .attr('r', (d) => (d.size ? d.size : 8))
    .attr('fill', (d) => (d.visited ? '#444' : d.color ? d.color : '#69b3a2'))
    .on('mouseover', function (d) {
      highlight(d)
      tooltipShow(d)
    })
    .on('mousemove', function () {
      tooltipPosition(isMobile)
    })
    .on('mouseout', function () {
      doNotHighlight()
    })
    .on('click', function (d) {
      d3.event.preventDefault()
      d3.event.stopPropagation()
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
      Router.push(d.slug)
    })
    .on('touchstart', function (d) {
      doNotHighlight()
      d3.event.preventDefault()
      d3.event.stopPropagation()
      highlight(d)
      tooltipShow(d)
      tooltipPosition(isMobile)
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
    })
}

const Universe = (posts) => {
  // const [helpShow, setHelpShow] = useState(false)

  const scatterRef = useRef(null)
  const tooltipRef = useRef(null)
  // let visitedUniverse

  // const toggleHelp = () => {
  //   setHelpShow((status) => {
  //     localStorage.setItem('visitedUniverse', true)
  //     visitedUniverse = true
  //     return !status
  //   })
  // }

  useEffect(() => {
    drawScatter(scatterRef, tooltipRef, posts.posts)
    document.body.style.overflow = 'hidden'
    // visitedUniverse = localStorage.getItem('visitedUniverse')
    // !visitedUniverse && toggleHelp()
  }, [
    scatterRef,
    tooltipRef,
    // visitedUniverse
  ])

  return (
    <>
      <div id="scatter" className="bg-gray-900">
        <svg ref={scatterRef} />
        {/* {helpShow && (
          <div className="welcome z-30 absolute w-full lg:w-auto top-1/2 lg:left-1/2 !text-gray-900 px-12 py-10 bg-green rounded-sm transform -translate-y-1/2 lg:-translate-x-1/2">
            <button
              type="button"
              className="z-50 absolute w-8 h-8 top-2 right-2"
              aria-label="Toggle Menu"
              onClick={toggleHelp}
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
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Welcome to <em>Astrolabe</em>.</h1>
              <p className="text-2xl mb-6">
                Hover over a star to see its details. Click or tap a star to take a closer look.
                Zoom with your mousewheel or a pinch-to-zoom gesture. Pan with a click-and-drag or
                touch-and-drag.
              </p>
              <p className="text-3xl italic cursor-pointer hover:text-white" onClick={toggleHelp}>Explore.</p>
            </div>
          </div>
        )} */}
        <div ref={tooltipRef} className="tooltipScatter" />
      </div>
    </>
  )
}

export default Universe
