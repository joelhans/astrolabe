import React from 'react'
import { useState } from 'react'

export const Context = React.createContext({ isChecked: Object, setChecked: () => {} })

const ChecklistProvider = ({ children }) => {
  const [isChecked, setChecked] = useState({})

  return <Context.Provider value={{ isChecked, setChecked }}>{children}</Context.Provider>
}

export default ChecklistProvider
