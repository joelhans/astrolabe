import fs from 'fs'
import hydrate from 'next-mdx-remote/hydrate'
import { getContent, dateSortDesc } from '@/lib/mdx'
import { BLOG_CONTENT_PATH } from '@config/constants';
import PostLayout from '@/layouts/PostLayout'
import MDXComponents from '@components/MDXComponents'
import PageTitle from '@components/PageTitle'
import generateRss from '@/lib/generate-rss'

export async function getStaticPaths() {
  const posts = await getContent(BLOG_CONTENT_PATH);
  const paths = posts.map(({ slug }) => ({
    params: {
      slug: slug.split('/'),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getContent(BLOG_CONTENT_PATH);
  const postSlug = slug.join('/');
  const [post] = posts.filter((post) => post.slug === postSlug);

  const postsSorted = posts.sort((a, b) => dateSortDesc(a.data.date, b.data.date))
  const postIndex = postsSorted.findIndex((post) => post.slug === postSlug)
  const prev = postsSorted[postIndex + 1] || null
  const next = postsSorted[postIndex - 1] || null

  const rss = generateRss(posts)
  fs.writeFileSync('./public/index.xml', rss)

  if (!post) {
    console.warn(`No content found for slug ${postSlug}`);
  }

  return {
    props: {
      mdxSource: post.md,
      frontMatter: post.data,
      prev,
      next
    },
  };
}

export default function Blog({ mdxSource, frontMatter, prev, next }) {
  const content = hydrate(mdxSource, { MDXComponents });

  return (
    <>
      {frontMatter.draft !== true ? (
        <PostLayout frontMatter={frontMatter} prev={prev} next={next}>
          {content}
        </PostLayout>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}



// export async function getStaticPaths() {
//   console.log(BLOG_CONTENT_PATH)

//   const posts = await getMdxContent(BLOG_CONTENT_PATH);
//   const paths = posts.map(({ slug }) => ({
//     params: {
//       slug: slug.split('/'),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };


//   const files = await getFiles('blog')
//   const paths = files.map(post => ({
//     params: { slug: stripSlug(formatSlug(post), 'blog'), },
//   }))

//   return {
//     paths: paths,
//     fallback: false,
//   }
// }

// export async function getStaticProps({ params }) {
//   console.log(params)

//   const allPosts = await getAllFilesFrontMatter('blog')
//   const postIndex = allPosts.findIndex((post) => post.slug === params.slug)
//   const prev = allPosts[postIndex + 1] || null
//   const next = allPosts[postIndex - 1] || null
//   const post = await getFileBySlug('blog', params.slug)

//   // rss
//   const rss = generateRss(allPosts)
//   fs.writeFileSync('./public/index.xml', rss)

//   return { props: { post, prev, next } }
// }

// export default function Blog({ post, prev, next }) {
//   const { mdxSource, frontMatter } = post
//   const content = hydrate(mdxSource, {
//     components: MDXComponents,
//   })

//   return (
//     <>
//       {frontMatter.draft !== true ? (
//         <PostLayout frontMatter={frontMatter} prev={prev} next={next}>
//           {content}
//         </PostLayout>
//       ) : (
//         <div className="mt-24 text-center">
//           <PageTitle>
//             Under Construction{' '}
//             <span role="img" aria-label="roadwork sign">
//               🚧
//             </span>
//           </PageTitle>
//         </div>
//       )}
//     </>
//   )
// }
