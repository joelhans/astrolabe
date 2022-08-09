import * as React from 'react'
import * as d3 from 'd3'
import Router from 'next/router'
var _ = require('lodash')

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
  const x = d3.scaleLinear().domain([-10, 10]).range([0, width])
  const y = d3.scaleLinear().domain([-10, 10]).range([height, 0])

  // Group our `posts` object by the asterisms we've already defined.
  // Not currently used for d3's sake!
  // const asterisms = d3.nest()
  //   .key((d) => { return d.asterism })
  //   .entries(posts)

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
      a.push({
        asterism: asterism,
        source: id,
        sourceX: x(declination),
        sourceY: y(ascension),
        target: linkedTo[0],
        targetX: x(posts.find((x) => x.id === linkedTo[0]).declination),
        targetY: y(posts.find((x) => x.id === linkedTo[0]).ascension),
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
  }

  // Function to reset highlighting.
  const doNotHighlight = function () {
    d3.selectAll('circle').transition().duration(200).attr('fill', '#69b3a2').attr('r', 5)
    d3.selectAll('line').transition().duration(200).attr('stroke-opacity', '0%')
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
    .attr('stroke-width', 4)
    .attr('stroke', '#fff')
    .attr('stroke-opacity', '0%')

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
      tooltipScatter.style('top', d3.event.y - 10 + 'px').style('left', d3.event.x + 20 + 'px')
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

// function drawChart(svgRef, posts) {
//   const Links = posts
//     .filter((post) => {
//       if (post.linkedTo[0]) {
//         return true
//       } else {
//         return false
//       }
//     })
//     .reduce((a, { id, linkedTo }) => {
//       a.push({ source: id, target: linkedTo[0] })
//       return a
//     }, [])

//   const GraphData = {
//     nodes: posts,
//     links: Links,
//   }

//   const svg = d3
//     .select(svgRef.current)
//     .attr('width', window.innerWidth)
//     .attr('height', window.innerHeight)
//     .call(
//       d3.zoom().on('zoom', () => {
//         svg.attr('transform', d3.event.transform)
//       })
//     )
//     .append('g')

//   const tooltip = d3.select('#chart').append('div').attr('class', 'tooltip')

//   const link = svg.selectAll('line').data(GraphData.links).join('line').style('stroke', '#aaa')

//   const node = svg
//     .append('g')
//     .attr('class', 'nodes')
//     .selectAll('g')
//     .data(GraphData.nodes)
//     .enter()
//     .append('a')
//     .attr('href', function (d) {
//       return d.id
//     })
//     .on('mouseover', function (d) {
//       d3.select(this).selectAll('circle').attr('fill', 'white')
//       tooltip
//         .html(
//           `
//           <p class="tooltipTitle">${d.title}</p>
//           <p class="tooltipAuthor">${d.author}</p>
//         `
//         )
//         .style('visibility', 'visible')
//     })
//     .on('mousemove', function () {
//       tooltip.style('top', d3.event.y - 10 + 'px').style('left', d3.event.x + 20 + 'px')
//     })
//     .on('mouseout', function () {
//       d3.select(this).selectAll('circle').attr('fill', '#69b3a2')
//       tooltip.style('visibility', 'hidden')
//     })
//     .on('click', function (d) {
//       d3.event.preventDefault()
//       d3.event.stopPropagation()
//       Router.push(d.slug)
//     })

//   const circles = node.append('circle').attr('r', 5).attr('fill', '#69b3a2')

//   const simulation = d3
//     .forceSimulation(GraphData.nodes)
//     .force(
//       'link',
//       d3
//         .forceLink()
//         .id(function (d) {
//           return d.id
//         })
//         .links(GraphData.links)
//         .distance(60)
//     )
//     .force('charge', d3.forceManyBody().strength(-200))
//     .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
//     .on('tick', ticked)

//   function ticked() {
//     link
//       .attr('x1', function (d) {
//         return d.source.x
//       })
//       .attr('y1', function (d) {
//         return d.source.y
//       })
//       .attr('x2', function (d) {
//         return d.target.x
//       })
//       .attr('y2', function (d) {
//         return d.target.y
//       })

//     node.attr('transform', function (d) {
//       return 'translate(' + d.x + ',' + d.y + ')'
//     })
//   }
// }

const Universe = (posts) => {
  // const svgRef = React.useRef(null)
  const scatterRef = React.useRef(null)

  React.useEffect(() => {
    // drawChart(svgRef, posts.posts)
    drawScatter(scatterRef, posts.posts)
  }, [scatterRef])

  return (
    <>
      <div id="scatter">
        <svg ref={scatterRef} />
      </div>
      {/* <div id="graph">
        <svg ref={svgRef} />
      </div> */}
    </>
  )
}

export default Universe
