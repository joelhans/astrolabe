'use client'

import * as d3 from 'd3'
import { event as currentEvent } from 'd3'
import { Dispatch } from 'react'
import { Asterism, Post, StarLink } from '@/types/content'
import { addHighlight, removeHighlight } from './highlight'
import StarscapeData from '@data/stars.json'

type UniverseSVG = d3.Selection<SVGGElement, unknown, null, undefined>

// Set a fixed width/height to prevent different screen sizes (or changing
// screen sizes) from altering the shape of the asterisms.
const width = 4000,
  height = 4000

// Create our scatter plot axes.
export const xScale = d3.scaleLinear().domain([-10, 10]).range([0, width])
export const yScale = d3.scaleLinear().domain([-10, 10]).range([height, 0])

// Define default colors to use in the Starscape.
const colors = ['#F94144', '#4D908E', '#f59e0b', '#c026d3', '#059669']
const starColors = {
  red: '#F94144',
  aqua: '#4D908E',
  green: '#059669',
  pink: '#c026d3',
  yellow: '#f59e0b',
} as const

// Type guard to check if a string is a key of starColors
type StarColorKey = keyof typeof starColors;
function isStarColor(color: string): color is keyof typeof starColors {
  return color in starColors;
}

// Define a shared zoom-and-pan call that both SVGs (`asterismRef` &&
// `scatterRef`) can share. It's not perfect, but it creates a kind of parallax
// effect when panning around.
const zoom = d3.zoom<SVGSVGElement, unknown>()
  // Restrict how far to scale.
  .scaleExtent([0.1,3])
  //.translateExtent([[0,0],[4000,4000]])
  .on("zoom", function (event: any) {
    d3
      .selectAll('.universe')
      .attr('transform', event.transform)
})

// Create the universe itself.
export const createUniverse = (asterismRef: SVGSVGElement, setTooltipData: Dispatch<Post | null>) => {
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
    .call(zoom)
    // This call and `attr` establish the position of the universe based on
    // either the defaults listed just above or the last known position from the
    // user's localstorage.
    .call(
      d3.zoom<SVGSVGElement, unknown>().transform,
      d3.zoomIdentity.translate(universePosition.x, universePosition.y).scale(universePosition.k)
    )
    // This allows you to click on the "background" of the universe to deselect
    // any stars and hide the tooltip, but still allow you to pan and zoom
    // without deselecting.
    .on('click', (d: any) => {
      if (d.target.nodeName === 'svg') {
        setTooltipData(null)
        removeHighlight(null)
      }
    })
    .append('g')
    .attr('class', 'universe')
    .attr(
      'transform',
      `translate(${universePosition.x}, ${universePosition.y}) scale(${universePosition.k})`
    )

  return svg
}

export const createGrid = (svg: UniverseSVG) => {
  const gridGroup = svg.append('g').attr('class', 'grid')

  // Add X grid lines
  gridGroup
    .append('g')
    .attr('class', 'grid-lines x-grid')
    .selectAll('line')
    .data(d3.range(-10, 11))
    .enter()
    .append('line')
    .attr('x1', d => xScale(d) ?? 0)
    .attr('y1', 0)
    .attr('x2', d => xScale(d) ?? 0)
    .attr('y2', height)
    .attr('stroke', '#ccc')
    .attr('stroke-width', 0.5);

  // Add Y grid lines
  gridGroup
    .append('g')
    .attr('class', 'grid-lines y-grid')
    .selectAll('line')
    .data(d3.range(-10, 11))
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('y1', d => yScale(d) ?? height)
    .attr('x2', width)
    .attr('y2', d => yScale(d) ?? height)
    .attr('stroke', '#ccc')
    .attr('stroke-width', 0.5);    

  // Add X axis labels
  gridGroup
    .append('g')
    .attr('class', 'grid-labels x-labels')
    .selectAll<SVGTextElement, number>('text')
    .data(d3.range(-10, 11, 1))
    .enter()
    .append('text')
    .attr('x', d => xScale(d) ?? 0)
    .attr('y', height + 50)
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .attr('font-size', '50px')
    .text(d => d.toString())

  // Add Y axis labels
  gridGroup
    .append('g')
    .attr('class', 'grid-labels y-labels')
    .selectAll<SVGTextElement, number>('text')
    .data(d3.range(-10, 11, 1))
    .enter()
    .append('text')
    .attr('x', -50)
    .attr('y', d => yScale(d) ?? height)
    .attr('dy', '0.32em')
    .attr('text-anchor', 'start')
    .attr('fill', '#fff')
    .attr('font-size', '50px')
    .text(d => d.toString())
}

// Group our `posts` object by the asterisms we've already defined and remove
// any that aren't part of an asterism (aka `key` = `null`).
export const createAsterisms = (posts: Post[]) =>
  d3.group(posts, (d: any) => d.asterism)

// Create a new object for each connection between two stars, including the
// slugs for each and the source/target coordinates, in the `xScale`/`yScale`,
// so that they can be drawn at the same position of the stars themselves.
export const createLinks = (posts: Post[]) =>
  posts
    .filter((post) => !!post.linkedTo)
    .reduce((acc, { asterism, id, declination, ascension, linkedTo }) => {
      // Loop through all linkedTo targets to support multiple.
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

// Create the stars based on the contents of the `/content` folder.
export const createStars = (svg: UniverseSVG, posts: Post[], setTooltipData: Dispatch<Post | null>, tooltipLinkRef: React.RefObject<HTMLAnchorElement>) => {
  const defs = svg.append('defs')

  svg
    .append('g')
    .attr('class','stars')
    .selectAll('.stars')
    .data(posts)
    .enter()
    .append('g')
    .attr('class', (d: Post) => d.asterism || '')
    .append('circle')
    .attr('class', (d: Post) => 'star ' + d.asterism + ' ' + d.slug)
    .attr('cx', (d: Post) => xScale(d.declination ?? 0) ?? 0)
    .attr('cy', (d) => yScale(d['ascension'] ?? 0) ?? 0)
    .attr('r', (d) => d.size ?? 20)
    .attr('fill', function (d: any) {
      if (d.gradient) {
        defs.append("radialGradient")
          .attr("id", 'grad-' + d.slug)
          .selectAll('stop')
          .data(d.gradient)
          .enter().append('stop')
          .attr('offset', function(d: any) { return d.offset })
          .attr('stop-color', function(d: any) { return d.color })
        return `url(#grad-${d.slug})`
      } else if (d.color && d.color.includes('#')) {
        return d.color 
      } else if (isStarColor(d.color)) {
        return starColors[d.color as StarColorKey]
      } else {
        return starColors.green
      }
    })

    // Traverse back to the parent (`g`) of the current element (`circle`). This
    // way, we can append the second `star-boundary` element as a sibling, not a
    // child.
    .select(function() { return this.parentElement })
    .append('circle')
    .attr('class', (d: Post) => `star-boundary ${d.slug}`)
    .attr('r', (d) => d.size != null ? d.size + 50 : 70)
    .attr('fill', '#faa')
    .attr('cx', (d: Post) => xScale(d.declination ?? 0) ?? 0)
    .attr('cy', (d) => yScale(d['ascension'] ?? 0) ?? 0)
    .attr('fill', 'rgba(0,0,0,0)')
    .attr('stroke-width', 10)
    .attr('stroke', 'rgb(252, 247, 255)')
    .attr('stroke-opacity', '0%')
    .attr('role', 'button')
    .attr('tabindex', '0')
    .attr('aria-label', (d: Post) => d.title)
    .on('mouseover', function (currentEvent, d:any) {
      addHighlight(d)
    })
    .on('mouseout', function (currentEvent, d:any) {
      removeHighlight(d)
    })
    // Handle both focus-grabbing pointer events to set up highlighting and
    // display the tooltip.
    .on('click touchstart', function (currentEvent, d:any) {
      removeHighlight(d)
      addHighlight(d)
      d3.selectAll(`.star-boundary.${d.slug}`).classed('selected', true)
      setTooltipData(d)
      localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
    })
    // Allow keyboard users to focus on stars, which then displays the tooltip.
    .on('keydown', function (currentEvent, d:any) {
      if (currentEvent.key === 'Enter' || currentEvent.key === 'Space') {
        removeHighlight(d)
        addHighlight(d)
        setTooltipData(d)
        localStorage.setItem('universePosition', JSON.stringify(d3.zoomTransform(this)))
        setTimeout(() => {
          if (tooltipLinkRef.current) {
            tooltipLinkRef.current.tabIndex = -1;
            tooltipLinkRef.current.focus();
          }
        }, 0);
      }
    })
}

// Create the lines that appear between inidivual stars in a given asterism.
export const createLines = (svg: UniverseSVG, links: StarLink[]) =>
  svg
    .insert('g')
    .lower()
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

// Create names for each asterism.
export const createNames = (svg: UniverseSVG, stars:any, asterisms:any) =>
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
      // Calculate the average X position of all the stars in this asterism,
      // which is then used to position the `name` text element.
      const width = this.getComputedTextLength()
      const max = Math.max(...d[1].map((o: any) => o.declination)),
        min = Math.min(...d[1].map((o: any) => o.declination)),
        mid = (max + min) / 2
      return (xScale(mid) ?? 0) - width * 3
    })
    .attr('y', function (d: any) {
      // Calculate the average Y position of all the stars in this asterism,
      // which is then used to position the `name` text element.
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

// Generate the background "Starscape." This uses a default JSON document of
// randomly-generated data that can be recreated if needed.
export const createStarscape = (svg: UniverseSVG) =>
  svg
    .append('g')
    .attr('class', 'starscape')
    .selectAll('starscape')
    .data(StarscapeData)
    .enter()
    .append('circle')
    .attr('cx', (d) => (xScale(d[0]) ?? 0) / 2)
    .attr('cy', (d) => (yScale(d[1]) ?? 0) / 2)
    .attr('r', '2')
    .attr('fill', (d) => colors[Math.floor(Math.random() * colors.length)])
    .attr('fill-opacity', '50%')
