import './App.css';
import Board from './components/Board.js'
import Keyboard from './components/Keyboard.js'
import GameOver from './components/GameOver.js'
import { createContext, useEffect, useState } from 'react'
import { boardDefault, generateWordSet } from './Words.js'

export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [curAttempt, setCurAttempt] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [correctWord, setCorrectWord] = useState("s")
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  

  useEffect(() => {
    generateWordSet().then((words) => {
      console.log("Wordfor today:", words.todaysWord)
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if(curAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[curAttempt.attempt][curAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurAttempt({...curAttempt, letterPos: curAttempt.letterPos +1})
  }

  const onDelete = () => {
    if(curAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[curAttempt.attempt][curAttempt.letterPos-1] = ""
    setBoard(newBoard)
    setCurAttempt({...curAttempt, letterPos: curAttempt.letterPos-1})
  }

  const onEnter = () => {
    if (curAttempt.letterPos !== 5) return

    let curWord = ""
    for (let i = 0; i<5; i++){
      curWord += board[curAttempt.attempt][i]
    }
    curWord += "\r"
    if (wordSet.has(curWord.toLowerCase())){
      setCurAttempt({attempt: curAttempt.attempt+1, letterPos: 0})
    }else {
      alert("Word Not Found!")
    }

    if (curWord.toLowerCase() === correctWord.toLowerCase()){
      console.log("You WIN")
      setGameOver({gameOver:true, guessedWord: true})
      return
    }

    if(curAttempt.attempt === 5){
      console.log("You LOST")
      setGameOver({gameOver:true, guessedWord: false})
      return
    }
    
  }

  return (
    <div className="App">
      <nav><h1>Wordle</h1></nav>
      <AppContext.Provider value={{board, setBoard, curAttempt, setCurAttempt, onSelectLetter, onDelete, onEnter, correctWord, disabledLetters, setDisabledLetters, gameOver, setGameOver}}>
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      
      </AppContext.Provider>
    </div>
  );
}

export default App;
