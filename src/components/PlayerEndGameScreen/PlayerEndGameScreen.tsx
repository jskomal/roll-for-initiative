import React from 'react'
import { Link } from 'react-router-dom'
import './PlayerEndGameScreen.css'

const PlayerEndGameScreen = () => {
  return (
    <div className='player-win-area'>
      <p>You win.</p>
      <Link to='/character-select' >
        <button>Play Again?</button>
      </Link>
    </div>
  )
}

export default PlayerEndGameScreen
