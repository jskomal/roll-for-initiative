import React from 'react'
import { Link } from 'react-router-dom'
import './MonsterEndGameScreen.css'
import death from '../../images/fallenwarrior.gif'

const MonsterEndGameScreen = () => {
  return (
    <div className='monster-win-area'>
      <img className='lose-gif' src={death} alt='you lose' />
      <div className='losing-text-container'>
        <p className='losing-text'>You have fallen...</p>
        <Link to='/character-select'>
          <button className='losing-button'>Redeem your honor?</button>
        </Link>
      </div>
    </div>
  )
}

export default MonsterEndGameScreen
