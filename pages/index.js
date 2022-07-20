import React, { useEffect } from 'react'
import * as d3 from 'd3'
import { PageSeo } from '@components/SEO'
import CustomLink from '@components/Link'
import siteMetadata from '@data/siteMetadata'
import Tag from '@components/Tag'
import { getFrontMatter } from '@/lib/mdx'
import { WORK_CONTENT_PATH } from '@config/constants'
import LinkData from '@data/linkData.json'

export async function getStaticProps() {
  const posts = await getFrontMatter(WORK_CONTENT_PATH, true)
  return { props: { posts } }
}

export default function Home({ posts }) {
  const Links = posts
    .filter((post) => {
      if (post.linkedTo[0]) {
        return true
      } else {
        return false
      }
    })
    .map((post) => {
      // console.log(post)
      var link
      link = {
        source: post.slug,
        target: post.linkedTo[0],
      }
      return link
    })

  useEffect(() => {
    const margin = { top: 50, right: 50, bottom: 50, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom

    const svg = d3
      .select('#area')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const link = svg.selectAll('line').data(Links).enter().append('line').style('stroke', '#aaa')

    const node = svg
      .selectAll('circle')
      .data(posts)
      .join('circle')
      .attr('r', 20)
      .style('fill', '#69b3a2')

    const simulation = d3
      .forceSimulation(posts)
      .force(
        'link',
        d3
          .forceLink()
          .id(function (d) {
            return d.slug
          })
          .links(Links)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('end', ticked)

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
          return d.x
        })
        .attr('cy', function (d) {
          return d.y
        })
    }

    // const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    // svg
    //   .append("g")
    //   .attr("transform", `translate(0, ${height})`)
    //   .call(d3.axisBottom(x));

    // const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    // svg.append("g").call(d3.axisLeft(y));

    // svg
    //   .selectAll("whatever")
    //   .data(DATA)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", (d) => x(d.x))
    //   .attr("cy", (d) => y(d.y))
    //   .attr("r", 7);
  }, [])

  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div className="mt-24">
        <svg id="area" height={600} width={800}></svg>
      </div>
      <div className="mt-24 mb-24">
        <h2 className="text-lg text-sea font-display font-bold uppercase mb-8">Recent work</h2>
        <ul>
          {posts.slice(0, 3).map((frontMatter) => {
            const { slug, draft, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="block mb-16">
                <CustomLink href={`/${slug}`}>
                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-2 hover:text-sea transition-all">
                    {title}
                  </h3>
                </CustomLink>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                <p className="prose prose-md lg:prose-lg dark:prose-dark text-gray-500 dark:text-gray-400 mb-1">
                  {summary}
                </p>
                <CustomLink
                  href={`/${slug}`}
                  className="text-sm font-bold hover:text-sea transition-all"
                >
                  Read more &rarr;
                </CustomLink>
              </li>
            )
          })}
        </ul>
        <p className="text-xl font-medium">
          <CustomLink className="hover:text-sea transition-all" href="/articles">
            Read some other work &rarr;
          </CustomLink>
        </p>
      </div>
    </>
  )
}
