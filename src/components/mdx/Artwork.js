import Image from 'next/image'

const Artwork = ({ src, width, height, alt }) => {
  return (
    <>
      <div className="block relative 2xl:-mx-48 xl:-mx-32">
        <Image src={src} width={width} height={height} alt={alt} />
      </div>
    </>
  )
}

export default Artwork
