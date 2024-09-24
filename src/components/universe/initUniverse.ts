'use client'

import * as d3 from 'd3'
import { event as currentEvent } from 'd3'
import { Asterism, Post, StarLink } from '@/types/content'
import { addHighlight, removeHighlight, removeAllHighlight } from './highlight'
import StarscapeData from '@data/stars.json'

type UniverseSVG = d3.Selection<SVGGElement, unknown, null, undefined>

// Set a fixed width/height to prevent different screen sizes (or changing
// screen sizes) from altering the shape of the asterisms.
const width = 4000,
  height = 4000

// Create our scatter plot axes.
export const xScale = d3.scaleLinear().domain([-10, 10]).range([0, width])
export const yScale = d3.scaleLinear().domain([-10, 10]).range([height, 0])

const colors = ['#F94144', '#4D908E', '#f59e0b', '#F9C74F', '#c026d3', '#059669', '#4D908E']

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
  
  // Create the SVG container, set its dimensions, and initiate zoom+pan.
  const svg = d3
    .select(asterismRef)
    .attr('width', width)
    .attr('height', height)
    .call(
      d3.zoom<SVGSVGElement, unknown>().transform,
      d3.zoomIdentity.translate(universePosition.x, universePosition.y).scale(universePosition.k)
    )
    .call(
      d3.zoom<SVGSVGElement, unknown>().on('zoom', (event: any, d) => {
        svg.attr('transform', event.transform)
      })
    )
    .append('g')
    .attr(
      'transform',
      `translate(${universePosition.x}, ${universePosition.y}) scale(${universePosition.k})`
    )
  
  // Define the SVG definitions.
  const defs = svg.append('defs')

  return svg
}

// Group our `posts` object by the asterisms we've already defined and remove
// any that aren't part of an asterism (aka `key` = `null`).
export const createAsterisms = (posts: Post[]) =>
  d3.group(posts, (d: any) => d.asterism)

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

export const createStars = (svg: UniverseSVG, posts: Post[], setTooltipData: Dispatch<Post>) => {
  const group = svg.append('g').attr('class', 'asterisms')
  const defs = svg.append('defs')

  group
    .append('g')
    .attr('class','stars')
    .selectAll('stars')
    .data(posts)
    .enter()
    .append('a')
    .attr('href', (d: Post) => d.id)
    .append('circle')
    .attr('class', (d: Post) => 'star ' + d.asterism + ' ' + d.slug)
    .attr('cx', (d: Post) => xScale(d.declination ?? 0) ?? 0)
    .attr('cy', (d) => yScale(d['ascension'] ?? 0) ?? 0)
    .attr('r', (d) => d.size ?? 20)
    .attr('fill', function (d) {
      if (d.gradient) {
        defs.append("radialGradient")
          .attr("id", 'grad-' + d.slug)
          .selectAll('stop')
          .data(d.gradient)
          .enter().append('stop')
          .attr('offset', function(d: any) { return d.offset })
          .attr('stop-color', function(d: any) { return d.color })
      }      return d.gradient ? `url(#grad-${d.slug})` : d.color ? d.color : '#69b3a2'
    })
    .attr('role', 'button')
    .attr('tabindex', '0')
    .attr('aria-label', (d: Post) => d.title)
    .select(function() { return this.parentElement })
    .append('circle')
    .attr('class', (d: Post) => `star-boundary ${d.slug}`)
    .attr('r', (d) => d.size + 50)
    .attr('fill', '#faa')
    .attr('cx', (d: Post) => xScale(d.declination ?? 0) ?? 0)
    .attr('cy', (d) => yScale(d['ascension'] ?? 0) ?? 0)
    .attr('fill', 'rgba(0,0,0,0)')
    .attr('stroke-width', 10)
    .attr('stroke', 'rgb(252, 247, 255)')
    .attr('stroke-opacity', '0%')
    .on('mouseover', function (currentEvent, d:any) {
      addHighlight(d)
    })
    .on('mouseout', function (currentEvent, d:any) {
      removeHighlight(d)
    })
    .on('click', function (currentEvent, d:any) {
      removeHighlight(d)
      event.preventDefault()
      event.stopPropagation()
      addHighlight(d)
      setTooltipData(d)
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
    })
    .on('touchstart', function (currentEvent, d:any) {
      removeHighlight(d)
      event.preventDefault()
      event.stopPropagation()
      addHighlight(d)
      tooltipShow(d)
      setTooltipData(d)
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
    })
}

export const createLines = (svg: UniverseSVG, links: StarLink[]) =>
  svg
    .append('g')
    .attr('class', 'lines')
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('class', (d) => 'line ' + d.asterism)
    .attr('x1', (d) => d.sourceX ?? 0)
    .attr('y1', (d) => d.sourceY ?? 0)
    .attr('x2', (d) => d.targetX ?? 0)
    .attr('y2', (d) => d.targetY ?? 0)
    .attr('stroke-width', 10)
    .attr('stroke', 'rgb(252, 247, 255)')
    .attr('stroke-opacity', '0%')

export const createNames = (svg: UniverseSVG, posts: Post[], asterisms: Asterism[]) =>
  svg
    .append('g')
    .attr('class', 'names')
    .selectAll('names')
    .data(asterisms)
    .enter()
    .append('text')
    .attr('class', (d: any) => 'name ' + d[0] + ' font-serif font-bold')
    .text((d: any) => d[1][0].asterismFull)
    .attr('x', function (d: any) {
      // Calculate the average X position of all the stars in this asterism.
      const width = this.getComputedTextLength()
      const max = Math.max(...d[1].map((o: any) => o.declination)),
        min = Math.min(...d[1].map((o: any) => o.declination)),
        mid = (max + min) / 2
      return (xScale(mid) ?? 0) - width * 3
    })
    .attr('y', function (d: any) {
      // Calculate the average Y position of all the stars in this asterism.
      const height = this.getBoundingClientRect().height
      const max = Math.max(...d[1].map((o: any) => o.ascension)),
        min = Math.min(...d[1].map((o: any) => o.ascension)),
        mid = (max + min) / 2
      return (yScale(mid) ?? 0) - height + 60
    })
    .attr('fill', '#fff')
    .attr('font-size', '7rem')
    .attr('font-style', 'italic')
    .attr('fill-opacity', '20%')
    .on('mouseover', function (event, d:any) {
      addHighlight(d)
    })
    .on('mouseout', function (event, d:any) {
      removeHighlight(d)
    })

// Generate the background "Starscape."
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
