import * as React from 'react'
import * as d3 from 'd3'

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

  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom

  const svg = d3
    .select(svgRef.current)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const link = svg.selectAll('line').data(GraphData.links).join('line').style('stroke', '#aaa')

  const node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(GraphData.nodes)
    .enter()
    .append('g')

  const circles = node.append('circle').attr('r', 20).attr('fill', '#69b3a2')

  const labels = node
    .append('text')
    .text(function (d) {
      return d.id
    })
    .attr('x', 6)
    .attr('y', 3)

  node.append('title').text(function (d) {
    return d.id
  })

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
    )
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))
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

  // svg
  //   .attr("width", w)
  //   .attr("height", h)
  //   .style("margin-top", 50)
  //   .style("margin-left", 50);

  // svg
  //   .selectAll("rect")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr("x", (d, i) => i * 40)
  //   .attr("y", (d, i) => h - 10 * d)
  //   .attr("width", 20)
  //   .attr("height", (d, i) => d * 10)
  //   .attr("fill", "steelblue");
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
