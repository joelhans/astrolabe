import * as React from 'react'
import * as d3 from 'd3'
import Cookies from 'universal-cookie'
import Router from 'next/router'

function drawScatter(scatterRef, tooltipRef, posts) {
  // Initiate cookies and set the `visitedStars` cookie to an empty array if
  // there are no cookies previously.
  const cookies = new Cookies()
  const visitedStars = cookies.get('visitedStars') || []
  !visitedStars && cookies.set('visitedStars', [], { path: '/', sameSite: 'strict' })

  // Set a fixed width/height to prevent different screen sizes (or changing
  // screen sizes) from altering the shape of the asterisms.
  const width = 4000,
    height = 4000,
    xx = 0,
    yy = 0,
    scale = 0.4

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

  // Create our scatter plot axes.
  const x = d3.scaleLinear().domain([-10, 10]).range([0, width])
  const y = d3.scaleLinear().domain([-10, 10]).range([height, 0])

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
    // Shrink all stars.
    d3.selectAll('circle').transition().duration(200).attr('r', 3)

    // Highlight stars of the asterism.
    // If there is no asterism, then select only that star.
    d3.selectAll(d.asterism ? '.' + d.asterism : '.' + d.slug)
      .filter('.star')
      .transition()
      .duration(200)
      .attr('fill', '#fff')

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
      .attr('fill-opacity', '100%')
  }

  // Function to reset highlighting.
  const doNotHighlight = function () {
    d3.selectAll('circle')
      .transition()
      .duration(200)
      .attr('r', (d) => (d.size ? d.size : 8))
      .attr('fill', (d) => (d.visited ? '#444' : d.color ? d.color : '#69b3a2'))
    d3.selectAll('line').transition().duration(200).attr('stroke-opacity', '0%')
    d3.selectAll('text').transition().duration(200).attr('fill-opacity', '0%')
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
      const exes =
        d.values
          .map((star) => {
            return star.declination
          })
          .reduce((a, b) => a + b) / d.values.length
      return x(exes)
    })
    .attr('y', function (d) {
      // Calculate the average Y position of all the stars in this asterism.
      const whys =
        d.values
          .map((star) => {
            return star.ascension
          })
          .reduce((a, b) => a + b) / d.values.length
      return y(whys)
    })
    .attr('fill', '#fff')
    .attr('font-size', '5rem')
    .attr('font-style', 'italic')
    .attr('fill-opacity', '0%')

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
      tooltipScatter
        .html(
          `
          <p class="text-5xl font-bold mb-4">${d.title}</p>
          <p class="text-sm text-gray-400 font-mono font-bold">${d.author}</p>
          ${
            d.summary
              ? `<p class="prose prose-2xl !text-fuchsia-400 italic mt-3">${d.summary}</p>`
              : ``
          }
          ${
            d.visited
              ? `<p class="text-sm text-gray-400 font-mono font-bold mt-3">You've visited this star before.</p>`
              : ``
          }
        `
        )
        .style('visibility', 'visible')
    })
    .on('mousemove', function () {
      // Account for the star position along the x axis in relationship to the
      // window's width so that we can place the tooltip on the correct side.
      d3.event.x + tooltipRef.current.offsetWidth < window.innerWidth
        ? tooltipScatter.style('left', d3.event.x + 30 + 'px')
        : tooltipScatter.style('left', d3.event.x - tooltipRef.current.offsetWidth - 30 + 'px')

      // Same for the y axis.
      d3.event.y + tooltipRef.current.offsetHeight < window.innerHeight
        ? tooltipScatter.style('top', d3.event.y - 10 + 'px')
        : tooltipScatter.style('top', d3.event.y - tooltipRef.current.offsetHeight + 10 + 'px')
    })
    .on('mouseout', function () {
      doNotHighlight()
      d3.select('.tooltipScatter').style('visibility', 'hidden')
    })
    .on('click', function (d) {
      d3.event.preventDefault()
      d3.event.stopPropagation()
      Router.push(d.slug)
    })
}

const Universe = (posts) => {
  const scatterRef = React.useRef(null)
  const tooltipRef = React.useRef(null)

  React.useEffect(() => {
    drawScatter(scatterRef, tooltipRef, posts.posts)
    document.body.style.overflow = 'hidden'
  }, [scatterRef, tooltipRef])

  return (
    <>
      <div id="scatter" className="bg-gray-900">
        <svg ref={scatterRef} />
        <div ref={tooltipRef} className="tooltipScatter" />
      </div>
    </>
  )
}

export default Universe
