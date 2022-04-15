import React from 'react'
import { Link } from 'react-router-dom'
import './MonsterEndGameScreen.css'

const MonsterEndGameScreen = () => {
  return (
    <div className='monster-win-area'>
      <p>You suck, loser!</p>
      <Link to='/character-select'>
        <button>Play Again?</button>
      </Link>
    </div>
  )
}

export default MonsterEndGameScreen
