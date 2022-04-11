import React from 'react'
import './CharacterCard.css'
import { CharacterStats } from '../../App'

const CharacterCard = ({ DnDClass, name, HP, AC, weapon, weaponDmg, toHit, initiative, bonusDmg, specialAbility, portrait, isClicked, toggleDetails } : CharacterStats) => {
  console.log(isClicked)
  return (
    <section className='character-card' onClick={toggleDetails}>
      {!isClicked && <img src={portrait} alt={`${name} portrait`}/>}
      <h1 className='champion-name'>{name}</h1>
      <h2 className='champion-class'>{DnDClass}</h2>
      {isClicked && (<div className="champion-details">
        <h3>Hit Points: {HP}</h3>
        <h3>Armor Class: {AC}</h3>
        <h3>Weapon: {weapon}</h3>
        <p>Weapon Damage: {weaponDmg}</p>
        <p>Hit Bonus: {toHit}</p>
        <p>Damage Bonus: {bonusDmg}</p>
        <p>Initiative Bonus: {initiative}</p>
        <p>Bonus Action: {specialAbility}</p>
      </div>
      )
      }
    </section>
  )
}

export default CharacterCard