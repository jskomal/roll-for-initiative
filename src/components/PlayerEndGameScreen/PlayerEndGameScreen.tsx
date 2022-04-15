import React from 'react'
import { Link } from 'react-router-dom'
import './PlayerEndGameScreen.css'
import backdrop from '../../images/fairytail.webp'

const PlayerEndGameScreen = () => {
  return (
    <div className='player-win-area'>
      <img className='win-gif' src={backdrop} alt='you win' />
      <div className='winning-text-container'>
        <p className='winning-text'>You defeated your foe!</p>
        <Link to='/character-select'>
          <button className='winning-button'>Another quest?</button>
        </Link>
      </div>
    </div>
  )
}

export default PlayerEndGameScreen
