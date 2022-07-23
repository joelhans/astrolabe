import * as React from 'react'
import * as d3 from 'd3'

function drawChart(svgRef, posts) {
  var Links = posts
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

  console.log(GraphData)

  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom

  const svg = d3
    .select(svgRef.current)
    // .append("svg")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  const link = svg.selectAll('line').data(GraphData.links).join('line').style('stroke', '#aaa')

  const node = svg
    .selectAll('circle')
    .data(GraphData.nodes)
    .join('circle')
    .attr('r', 20)
    .style('fill', '#69b3a2')

  // Let's list the force we wanna apply on the network
  const simulation = d3
    .forceSimulation(GraphData.nodes) // Force algorithm is applied to data.nodes
    .force(
      'link',
      d3
        .forceLink() // This force provides links between nodes
        .id(function (d) {
          return d.id
        }) // This provide  the id of a node
        .links(GraphData.links) // and this the list of links
    )
    .force('charge', d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force('center', d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
    .on('end', ticked)

  // This function is run at each iteration of the force algorithm, updating the nodes position.
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

    node
      .attr('cx', function (d) {
        return d.x + 6
      })
      .attr('cy', function (d) {
        return d.y - 6
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
