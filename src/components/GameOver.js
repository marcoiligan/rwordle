import React, {useContext} from 'react'
import {AppContext} from '../App.js'

const GameOver = () => {
    const {gameOver, curAttempt, correctWord} = useContext(AppContext)
  return (
    <div className="gameOver">
        <h3>{gameOver.guessedWord ? "You Correctly guessed" : "You failed"}</h3>
        <h1>Correct: {correctWord.toUpperCase()}</h1>
        {gameOver.guessedWord && (<h3> You guessed in {curAttempt.attempt} attempts</h3>)}
    </div>
  )
}

export default GameOver