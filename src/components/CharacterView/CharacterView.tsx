import React from 'react'
import './CharacterView.css'
import CharacterCard from '../CharacterCard/CharacterCard'
import { CharacterStats } from '../../App'

const CharacterView = ({ characters } : { characters : CharacterStats[]}) => {
  const characterCards = characters.map(character => {
    return <CharacterCard
      DnDClass={character.DnDClass}
      name={character.name}
      HP={character.HP}
      AC={character.AC}
      weapon={character.weapon}
      weaponDmg={character.weaponDmg}
      toHit={character.toHit}
      initiative={character.initiative}
      bonusDmg={character.bonusDmg}
      specialAbility={character.specialAbility}
      portrait={character.portrait}
      />
  })
  
  return (
    <section className="character-page">
      <h1 className='choose-text'>Choose your champion!</h1>
      <div className='character-container'>
        {characterCards}
      </div>
    </section>
  )
}

export default CharacterView
