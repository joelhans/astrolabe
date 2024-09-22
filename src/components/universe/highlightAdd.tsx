// Function to highlight a specific star or an asterism of stars. The function
// automatically makes all stars smaller upon mouseover on any star. Then,
// depending on whether or not it's part of an asterism, it either highlights
// the asterism or just the single star.

import * as d3 from 'd3'

const highlight = function (d) {
  // Highlight the star you're hovered over.
  d3.selectAll(`.${d.slug}-boundary`)
    .transition()
    .duration(400)
    .attr('stroke-opacity', '20%')

  console.log(d.asterism)

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

export default highlight
