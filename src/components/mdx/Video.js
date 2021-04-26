const Video = ({ src }) => {
  return (
    <video controls="controls">
      <source src={src} type="video/mp4" />
    </video>
  )
}

export default Video
