import React, {useContext} from 'react'
import { AppContext } from '../App.js'

const Key = ({keyVal, bigKey, disabled}) => {
  const { onSelectLetter, onDelete, onEnter } = useContext(AppContext)
  const selectLetter = () => {
    if (keyVal === "ENTER"){
      onEnter()
    }else if (keyVal === "DELETE"){
      onDelete()
    }else {
      onSelectLetter(keyVal)
    }
  }
  return (
    <div><div className="key" id={bigKey ? "big" : disabled && "disabled"} onClick={selectLetter}>{keyVal}</div></div>
  )
}

export default Key