const Video = ({ src, controls }) => {
  return (
    <video preload muted autoplay="autoplay" loop="loop">
      <source src={src} type="video/mp4" />
    </video>
  )
}

export default Video
