import * as React from 'react'
import * as d3 from 'd3'

function drawChart(svgRef, posts) {
  const Callout = (d) => {
    return (
      <>
        <p>{d.title}</p>
        <p>{d.author}</p>
      </>
    )
  }

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
    .append('g')

  const tooltip = d3.select('#chart').append('div').attr('class', 'tooltip')

  const link = svg.selectAll('line').data(GraphData.links).join('line').style('stroke', '#aaa')

  const node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(GraphData.nodes)
    .enter()
    .append('g')
    .append('a')
    .attr('href', function (d) {
      return d.id
    })
    .on('mouseover', function (d) {
      d3.select(this).selectAll('circle').attr('fill', 'white')
      tooltip
        .html(
          `
          <p className="tooltipTitle">${d.title}</p>
          <p>${d.author}</p>
        `
        )
        .style('visibility', 'visible')
    })
    .on('mousemove', function () {
      tooltip.style('top', event.y - 10 + 'px').style('left', event.x + 20 + 'px')
    })
    .on('mouseout', function () {
      d3.select(this).selectAll('circle').attr('fill', '#69b3a2')
      tooltip.style('visibility', 'hidden')
    })

  const circles = node.append('circle').attr('r', 10).attr('fill', '#69b3a2')

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

  React.useEffect(() => {
    drawChart(svgRef, posts.posts)
  }, [svgRef])

  return (
    <div id="chart">
      <svg ref={svgRef} />
    </div>
  )
}

export default Universe
