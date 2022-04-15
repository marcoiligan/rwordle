import React, {useContext, useEffect} from 'react'
import { AppContext } from '../App.js'

export const Letter = ({letterPos, attemptVal}) => {
  const { board, correctWord, curAttempt, setDisabledLetters } = useContext(AppContext)
  const letter = board[attemptVal][letterPos];

  const correct = correctWord.toUpperCase()[letterPos] === letter
  const almost = !correct && letter !== "" && correctWord.includes(letter)

  const letterState = curAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error")
  
  useEffect(() => {
    if(letter !== "" && !correct && !almost){
      setDisabledLetters((prev) => [...prev, letter])
    }
  }, [curAttempt.attempt])
  
  return (
    <div className="letter" id={letterState}>{letter} </div>
  )
}

export default Letter