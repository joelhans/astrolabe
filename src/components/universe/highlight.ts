// Function to reset highlighting.
import * as d3 from 'd3'

// Remove highlights from *most* everything, except for the `.star-boundary`
// with the same slug as the `Post` passed through to this function. This allows
// you to both remove the highlights from everything by not passing a `Post` at
// all.
export const removeHighlight = (d: any) => {
  d3.selectAll(`.star-boundary${d && `:not(${d.slug})`}`)
    .classed('selected', false)
    .transition()
    .duration(400)
    .attr('stroke-opacity', '0%')

  d3.selectAll('.line').transition().duration(400).attr('stroke-opacity', '0%')
  
  d3.selectAll('.name').transition().duration(400).attr('fill', '#fff').attr('fill-opacity', '20%')
}

// Add highlights to the `.star-boundary`, `.line`, and `.name` associated with
// the `Post` passed as the parameter.
export const addHighlight = function (d: any) {
  d3.selectAll(`.star-boundary.${d.slug}`)
    .transition()
    .duration(400)
    .attr('stroke-opacity', '40%')

  d3.selectAll(`.line.${d[0] ?? d.asterism}`)
    .transition()
    .duration(400)
    .attr('stroke-opacity', '20%')

  d3.selectAll(`.name.${d[0] ?? d.asterism}`)
    .transition()
    .duration(400)
    .attr('fill', '#059669')
    .attr('fill-opacity', '80%')
}

