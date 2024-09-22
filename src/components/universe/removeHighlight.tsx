// Function to reset highlighting.
import * as d3 from 'd3'

const removeHighlight = (d) => {
  console.log(d)
  d3.selectAll(`circle.star-boundary`)
    .transition()
    .duration(400)
    .attr('stroke-opacity', '0%')
  d3.selectAll('line').transition().duration(400).attr('stroke-opacity', '0%')
  d3.selectAll('text').transition().duration(400).attr('fill', '#fff').attr('fill-opacity', '20%')
}

export default removeHighlight
