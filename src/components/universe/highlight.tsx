// Function to reset highlighting.
import * as d3 from 'd3'

export const removeHighlight = (d) => {
  d3.selectAll(`circle.star-boundary:not(.${d.slug}-boundary`)
    .transition()
    .duration(400)
    .attr('stroke-opacity', '0%')
  d3.selectAll('line').transition().duration(400).attr('stroke-opacity', '0%')
  d3.selectAll('text').transition().duration(400).attr('fill', '#fff').attr('fill-opacity', '20%')
}

export const addHighlight = function (d) {
  // Highlight the star you're hovered over.
  d3.selectAll(`.${d.slug}-boundary`)
    .transition()
    .duration(400)
    .attr('stroke-opacity', '20%')

  // Highlight the lines between the stars of the chosen asterism.
  d3.selectAll(`.line.${d.asterism}`)
    .transition()
    .duration(400)
    .attr('stroke-opacity', '50%')

  // Highlight the name of the chosen asterism.
  d3.selectAll(`.name.${d.asterism}`)
    .transition()
    .duration(400)
    .attr('fill', '#059669')
    .attr('fill-opacity', '80%')
}

