import { useContext } from 'react'
import { Context } from './ChecklistProvider'

const Checkbox = ({ id, text }) => {
  const { isChecked, setChecked } = useContext(Context)

  // Remove the `_final` part of from `input` elements in the final checklist so
  // that their state cae be synced.
  const CleanID = id.indexOf('_') == -1 ? id : id.substring(0, id.indexOf('_'))

  const handleChange = (event) => {
    setChecked((prev) => ({
      ...prev,
      [CleanID]: event.target.checked,
    }))
  }

  return (
    <div className="flex items-start prose mt-2">
      <input
        className={`${CleanID} !mt-2 mr-2`}
        type="checkbox"
        id={id}
        name={id}
        checked={isChecked[CleanID] ?? false}
        onChange={handleChange}
      />
      <label className="hover:cursor-pointer" htmlFor={id}>
        {text}
      </label>
    </div>
  )
}

export default Checkbox
