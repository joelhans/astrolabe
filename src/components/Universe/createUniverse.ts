import * as d3 from 'd3'
import StarscapeData from '@data/stars.json'
import { Asterism, Post, StarLink } from '@/types/content'
import { resetHighlight, highlight } from './highlight'
import { Dispatch } from 'react'

type UniverseSVG = d3.Selection<SVGGElement, unknown, null, undefined>

// Set a fixed width/height to prevent different screen sizes (or changing
// screen sizes) from altering the shape of the asterisms.
const width = 4000,
  height = 4000

// Create our scatter plot axes.
export const xScale = d3.scaleLinear().domain([-10, 10]).range([0, width])
export const yScale = d3.scaleLinear().domain([-10, 10]).range([height, 0])

const colors = ['#F94144', '#4D908E', '#f59e0b', '#F9C74F', '#c026d3', '#059669', '#4D908E']

// Set dimensions and initiate zoom+pan.
export const createUniverse = (asterismRef: SVGSVGElement) => {
  let isMobile = window.innerWidth < 768

  // Find the last universe position, if it exists, which we use use to set the
  // x, y, and scale of the Universe itself.
  const savedPosition = localStorage.getItem('universePosition')
  const universePosition = savedPosition
    ? JSON.parse(savedPosition)
    : {
        x: isMobile ? -250 : -300,
        y: isMobile ? 200 : -75,
        k: isMobile ? 0.2 : 0.3,
      }
  localStorage.setItem('universePosition', JSON.stringify(universePosition))

  const svg = d3
    .select(asterismRef)
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'relative')
    .call(
      d3.zoom<SVGSVGElement, unknown>().transform,
      d3.zoomIdentity.translate(universePosition.x, universePosition.y).scale(universePosition.k)
    )
    .call(
      d3.zoom<SVGSVGElement, unknown>().on('zoom', () => {
        svg.attr('transform', d3.event.transform)
      })
    )
    .append('g')
    .attr('class', 'universe')
    .attr(
      'transform',
      `translate(${universePosition.x}, ${universePosition.y}) scale(${universePosition.k})`
    )

  return svg
}

// Generate the Starscape and the star "generator".
export const createStarscape = (scatterRef: SVGSVGElement) =>
  d3
    .select(scatterRef)
    .attr('width', '100vw')
    .attr('height', '100vh')
    .append('g')
    .attr('class', 'starscape')
    .selectAll('starscape')
    .data(StarscapeData)
    .enter()
    .append('circle')
    .attr('cx', (d) => (xScale(d[0]) ?? 0) / 2)
    .attr('cy', (d) => (yScale(d[1]) ?? 0) / 2)
    .attr('r', '1')
    .attr('fill', (d) => colors[Math.floor(Math.random() * colors.length)])
    .attr('fill-opacity', '50%')

// Group our `posts` object by the asterisms we've already defined and remove
// any that aren't part of an asterism (aka `key` = `null`).
export const createAsterisms = (posts: Post[]) =>
  d3
    .nest()
    .key((d: any) => d.asterism)
    .entries(posts)
    .filter((d) => d.key !== 'null')

// Build a list of links using {source: x, target: y} syntax.
export const createLinks = (posts: Post[]) =>
  posts
    .filter((post) => !!post.linkedTo)
    .reduce((acc, { asterism, id, declination, ascension, linkedTo }) => {
      // Loop through all linkedTo targets to support multiple
      const links: StarLink[] =
        linkedTo?.map((link) => ({
          asterism: asterism,
          source: id.split('/')[0],
          sourceX: xScale(declination ?? 0),
          sourceY: yScale(ascension ?? 0),
          target: link,
          targetX: xScale(posts?.find((post) => post.id === link)?.declination ?? 0),
          targetY: yScale(posts?.find((post) => post.id === link)?.ascension ?? 0),
        })) ?? []
      return [...acc, ...links]
    }, [] as StarLink[])

// Draw lines between the stars of an asterism.
export const createLines = (svg: UniverseSVG, links: StarLink[]) =>
  svg
    .append('g')
    .attr('class', 'lines')
    .selectAll('lines')
    .data(links)
    .enter()
    .append('line')
    .attr('class', (d) => 'line ' + d.asterism)
    .attr('x1', (d) => d.sourceX ?? 0)
    .attr('y1', (d) => d.sourceY ?? 0)
    .attr('x2', (d) => d.targetX ?? 0)
    .attr('y2', (d) => d.targetY ?? 0)
    .attr('stroke-width', 2)
    .attr('stroke', '#D3D3D3')
    .attr('stroke-opacity', '0%')

// Create the asterism name.
export const createNames = (svg: UniverseSVG, asterisms: Asterism[]) =>
  svg
    .append('g')
    .attr('class', 'names')
    .selectAll('names')
    .data(asterisms)
    .enter()
    .append('text')
    .attr('class', (d) => 'name ' + d.values[0]?.asterism + ' font-serif')
    .text((d) => d.values[0]?.asterismFull)
    .attr('x', function (d) {
      // Calculate the average X position of all the stars in this asterism.
      const width = this.getComputedTextLength()
      const max = Math.max(...d.values.map((o: any) => o.declination)),
        min = Math.min(...d.values.map((o: any) => o.declination)),
        mid = (max + min) / 2
      return (xScale(mid) ?? 0) - width * 2
    })
    .attr('y', function (d) {
      // Calculate the average Y position of all the stars in this asterism.
      const height = this.getBoundingClientRect().height
      const max = Math.max(...d.values.map((o: any) => o.ascension)),
        min = Math.min(...d.values.map((o: any) => o.ascension)),
        mid = (max + min) / 2
      return (yScale(mid) ?? 0) + 40
    })
    .attr('fill', '#fff')
    .attr('font-size', '7rem')
    .attr('font-style', 'italic')
    .attr('fill-opacity', '20%')
    .on('mouseover', function (d: any) {
      highlight(d)
    })
    .on('mouseout', function () {
      resetHighlight()
    })

// Create the stars.
export const createStars = (svg: UniverseSVG, posts: Post[], setTooltipData: Dispatch<Post>) => {
  const group = svg.append('g').attr('class', 'asterisms')

  group
    .append('g')
    .attr('class', 'stars')
    .selectAll('stars')
    .data(posts)
    .enter()
    .append('circle')
    .attr('class', (d: Post) => 'star pointer ' + d.asterism + ' ' + d.slug)
    .attr('cx', (d: Post) => xScale(d.declination ?? 0) ?? 0)
    .attr('cy', (d) => yScale(d['ascension'] ?? 0) ?? 0)
    .attr('r', (d) => d.size ?? 20)
    .attr('fill', (d) =>
      d.visited ? '#666' : d.gradient ? `url(#${d.gradient})` : d.color ? d.color : '#69b3a2'
    )
    .attr('role', 'button')
    .attr('tabindex', '0')
    .attr('aria-label', (d: Post) => d.title)
    .on('mouseover', function (d) {
      highlight(d)
    })
    .on('mouseout', function () {
      resetHighlight()
    })
    .on('click', function (d) {
      resetHighlight()
      d3.event.preventDefault()
      d3.event.stopPropagation()
      highlight(d)
      setTooltipData(d)
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
    })
    .on('touchstart', function (d) {
      resetHighlight()
      d3.event.preventDefault()
      d3.event.stopPropagation()
      highlight(d)
      setTooltipData(d)
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
    })
    .on('keydown', function (d) {
      if (d3.event.key == 'Enter' || d3.event.key == 'Space') {
        resetHighlight()
        d3.event.preventDefault()
        d3.event.stopPropagation()
        highlight(d)
        setTooltipData(d)
        localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
      }
    })

  return group
}
