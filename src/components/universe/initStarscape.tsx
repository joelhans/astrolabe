// Generate the Starscape.
// And the star "generator".
// const particles = d3.range(1000).map(function(i) {
//   return [Math.random() * 40 * (Math.round(Math.random()) ? 1 : -1), Math.random() * 40 * (Math.round(Math.random()) ? 1 : -1)];
// })
// console.log(JSON.stringify(particles))

import * as d3 from 'd3'
import StarscapeData from '@data/stars.json'

const initStarscape = (svg, x, y) => {
  const colors = ['#F94144', '#4D908E', '#f59e0b', '#F9C74F', '#c026d3', '#059669', '#4D908E']
  const starscape = svg
    .selectAll('scapePoints')
    .data(StarscapeData)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d[0]) ?? 0)
    .attr('cy', (d) => y(d[1]) ?? 0)
    .attr('r', '5')
    .attr('fill', (d) => colors[Math.floor(Math.random() * colors.length)])
    .attr('fill-opacity', '30%')
}

export default initStarscape
