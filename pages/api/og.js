import { ImageResponse } from '@vercel/og'
import Title from '../../public/static/title-path.svg'

export const config = {
  runtime: 'experimental-edge',
}

const font = fetch(
  new URL('../../public/static/fonts/IbarraRealNova-VariableFont_wght.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req) {
  const fontData = await font

  console.log(fontData)

  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'Astrolabe'

    // &author=<author>
    const hasAuthor = searchParams.has('author')
    const author = hasAuthor && searchParams.get('author')?.slice(0, 100)

    return new ImageResponse(
      (
        <div
          tw="bg-emerald-600"
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              // fontFamily: '"Ibarra Real Nova"',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            <div tw="flex text-gray-800 text-6xl">{title}</div>
            <div tw="flex text-gray-800 text-3xl italic mt-4">Discovered by {author}</div>
          </div>
          <div
            tw="text-2xl"
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: 20,
              right: 20,
            }}
          >
            Astrolabe
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Ibarra Real Nova',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
