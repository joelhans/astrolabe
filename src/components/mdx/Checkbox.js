const Checkbox = ({ id, text }) => {
  return (
    <div className="flex items-start prose mt-2">
      <input className="!mt-2 mr-2" type="checkbox" id={id} name={id} />
      <label className="hover:cursor-pointer" htmlFor={id}>
        {text}
      </label>
    </div>
  )
}

export default Checkbox
