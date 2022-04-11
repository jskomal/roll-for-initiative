import React from 'react'
import './CharacterCard.css'
import { CharacterStats } from '../../App'

const CharacterCard = ({ DnDClass, name, HP, AC, weapon, weaponDmg, toHit, initiative, bonusDmg, specialAbility, portrait } : CharacterStats) => {
  return (
    <section className='character-card'>
      <img src={portrait} alt={`${name} portrait`}/>
      <h1 className='champion-name'>{name}</h1>
      <h2 className='champion-class'>{DnDClass}</h2>
    </section>
  )
}

export default CharacterCard