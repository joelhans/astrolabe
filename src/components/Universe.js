import * as React from 'react'
import * as d3 from 'd3'
import Router from 'next/router'

function drawScatter(scatterRef, posts) {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom

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

  const x = d3.scaleLinear().domain([0, 10]).range([0, width])

  const y = d3.scaleLinear().domain([0, 10]).range([height, 0])

  const tooltipScatter = d3.select('#scatter').append('div').attr('class', 'tooltipScatter')

  const highlight = function (d) {
    const cluster = d.asterism
  }

  const doNotHighlight = function () {
    d3.selectAll('circle').transition().duration(200).style('fill', 'white')
  }

  svg
    .selectAll('scatterPoints')
    .data(posts)
    .enter()
    .append('a')
    .attr('href', function (d) {
      return d.id
    })
    .append('circle')
    .attr('class', function (d) {
      return 'star ' + d.asterism
    })
    .attr('cx', (d) => x(d['declination']))
    .attr('cy', (d) => y(d['ascension']))
    .attr('r', 5)
    .attr('fill', '#69b3a2')
    .on('mouseover', function (d) {
      d3.select(this).attr('fill', 'white')
      tooltipScatter
        .html(
          `
          <p class="tooltipTitle">${d.title}</p>
          <p class="tooltipAuthor">${d.author}</p>
          <p class="tooltipAsterism">Part of the ${d.asterism} asterism.</p>
        `
        )
        .style('visibility', 'visible')
    })
    .on('mousemove', function () {
      tooltipScatter.style('top', d3.event.y - 10 + 'px').style('left', d3.event.x + 20 + 'px')
    })
    .on('mouseout', function () {
      d3.select(this).attr('fill', '#69b3a2')
      tooltipScatter.style('visibility', 'hidden')
    })
    .on('click', function (d) {
      d3.event.preventDefault()
      d3.event.stopPropagation()
      Router.push(d.slug)
    })
}

function drawChart(svgRef, posts) {
  const Links = posts
    .filter((post) => {
      if (post.linkedTo[0]) {
        return true
      } else {
        return false
      }
    })
    .reduce((a, { id, linkedTo }) => {
      a.push({ source: id, target: linkedTo[0] })
      return a
    }, [])

  const GraphData = {
    nodes: posts,
    links: Links,
  }

  const svg = d3
    .select(svgRef.current)
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)
    .call(
      d3.zoom().on('zoom', () => {
        svg.attr('transform', d3.event.transform)
      })
    )
    .append('g')

  const tooltip = d3
    .select('#chart')
    .append('div')
    .attr('class', 'tooltip')
    .style('visibility', 'hidden')

  const link = svg.selectAll('line').data(GraphData.links).join('line').style('stroke', '#aaa')

  const node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(GraphData.nodes)
    .enter()
    .append('a')
    .attr('href', function (d) {
      return d.id
    })
    .on('mouseover', function (d) {
      d3.select(this).selectAll('circle').attr('fill', 'white')
      tooltip
        .html(
          `
          <p class="tooltipTitle">${d.title}</p>
          <p class="tooltipAuthor">${d.author}</p>
        `
        )
        .style('visibility', 'visible')
    })
    .on('mousemove', function () {
      tooltip.style('top', d3.event.y - 10 + 'px').style('left', d3.event.x + 20 + 'px')
    })
    .on('mouseout', function () {
      d3.select(this).selectAll('circle').attr('fill', '#69b3a2')
      tooltip.style('visibility', 'hidden')
    })
    .on('click', function (d) {
      d3.event.preventDefault()
      d3.event.stopPropagation()
      Router.push(d.slug)
    })

  const circles = node.append('circle').attr('r', 5).attr('fill', '#69b3a2')

  const simulation = d3
    .forceSimulation(GraphData.nodes)
    .force(
      'link',
      d3
        .forceLink()
        .id(function (d) {
          return d.id
        })
        .links(GraphData.links)
        .distance(60)
    )
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
    .on('tick', ticked)

  function ticked() {
    link
      .attr('x1', function (d) {
        return d.source.x
      })
      .attr('y1', function (d) {
        return d.source.y
      })
      .attr('x2', function (d) {
        return d.target.x
      })
      .attr('y2', function (d) {
        return d.target.y
      })

    node.attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })
  }
}

const Universe = (posts) => {
  const svgRef = React.useRef(null)
  const scatterRef = React.useRef(null)

  React.useEffect(() => {
    drawChart(svgRef, posts.posts)
    drawScatter(scatterRef, posts.posts)
  }, [svgRef])

  return (
    <>
      <div id="scatter">
        <svg ref={scatterRef} />
      </div>
      <div id="graph">
        <svg ref={svgRef} />
      </div>
    </>
  )
}

export default Universe
