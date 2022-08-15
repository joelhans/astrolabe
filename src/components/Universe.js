import * as React from 'react'
import * as d3 from 'd3'
import Router from 'next/router'

function drawScatter(scatterRef, posts) {
  // Set the margins and width/height.
  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom

  // Create the SVG container, set its dimensions, and initiate zoom+pan.
  const svg = d3
    .select(scatterRef.current)
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)
    .call(
      d3.zoom().on('zoom', () => {
        svg.attr('transform', d3.event.transform)
      })
    )
    .append('g')

  // Create our scatter plot axes.
  const x = d3.scaleLinear().domain([0, 20]).range([0, width])
  const y = d3.scaleLinear().domain([0, 20]).range([height, 0])

  // Group our `posts` object by the asterisms we've already defined and remove
  // any that aren't part of an asterism (aka `key` = `null`).
  const Asterisms = d3
    .nest()
    .key((d) => {
      return d.asterism
    })
    .entries(posts)
    .filter((d) => d.key !== 'null')

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
          source: id,
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
  const tooltipScatter = d3.select('#scatter').append('div').attr('class', 'tooltipScatter')

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
      .attr('r', 10)

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
    d3.selectAll('circle').transition().duration(200).attr('fill', '#69b3a2').attr('r', 5)
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
    .attr('font-size', '2rem')
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
    .attr('r', 5)
    .attr('fill', '#69b3a2')
    .on('mouseover', function (d) {
      highlight(d)
      tooltipScatter
        .html(
          `
          <p class="text-3xl font-bold mb-2">${d.title}</p>
          <p class="text-lg">${d.author}</p>
          ${
            d.asterism
              ? `
            <p class="text-base italic mt-2">Part of the <span class="font-bold">${d.asterismFull}</span> asterism.</p>
          `
              : ``
          }
        `
        )
        .style('visibility', 'visible')
    })
    .on('mousemove', function () {
      tooltipScatter.style('top', d3.event.y - 10 + 'px').style('left', d3.event.x + 40 + 'px')
    })
    .on('mouseout', function () {
      doNotHighlight()
      tooltipScatter.style('visibility', 'hidden')
    })
    .on('click', function (d) {
      d3.event.preventDefault()
      d3.event.stopPropagation()
      Router.push(d.slug)
    })
}

const Universe = (posts) => {
  const scatterRef = React.useRef(null)

  React.useEffect(() => {
    drawScatter(scatterRef, posts.posts)
  }, [scatterRef])

  return (
    <>
      <div id="scatter">
        <svg ref={scatterRef} />
      </div>
    </>
  )
}

export default Universe
