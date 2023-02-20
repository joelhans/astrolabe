import * as d3 from 'd3'
import { Post } from '@/types/content'

// Function to highlight a specific star or an asterism of stars. The function
// automatically makes all stars smaller upon mouseover on any star. Then,
// depending on whether or not it's part of an asterism, it either highlights
// the asterism or just the single star.
export const highlight = function (d: Post) {
  // Highlight the star you're hovered over.
  d3.selectAll('.' + d.slug)
    .filter('.star')
    .transition()
    .duration(200)
    .attr('fill', d.gradient ? `url(#white)` : '#fff')

  if (d.asterism) {
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
      .attr('fill', '#059669')
      .attr('fill-opacity', '100%')
  } else if (d.key) {
    // Highlight stars of the asterism when you hover over an asterism.
    d3.selectAll('.' + d.key)
      .filter('.star')
      .transition()
      .duration(200)
      .attr('fill', '#fff')

    // Highlight the lines between the stars of the chosen asterism.
    d3.selectAll('.' + d.key)
      .filter('.line')
      .transition()
      .duration(200)
      .attr('stroke-opacity', '100%')

    // Highlight the name of the chosen asterism.
    d3.selectAll('.' + d.key)
      .filter('.name')
      .transition()
      .duration(200)
      .attr('fill', '#059669')
      .attr('fill-opacity', '100%')
  }
}

// Function to reset highlighting.
export const resetHighlight = function () {
  d3.selectAll('circle')
    .filter('.star')
    .transition()
    .duration(200)
    .attr('r', (d: any) => (d.size ? d.size : 20))
    .attr('fill', (d: any) =>
      d.visited ? '#666' : d.gradient ? `url(#${d.gradient})` : d.color ? d.color : '#69b3a2'
    )
  d3.selectAll('line').transition().duration(200).attr('stroke-opacity', '0%')
  d3.selectAll('text').transition().duration(200).attr('fill', '#fff').attr('fill-opacity', '20%')
}
