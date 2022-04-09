import React from 'react'
import CharacterCard from '../CharacterCard/CharacterCard'

interface CharacterStats {
  class: string
  name: string
  HP: number
  AC: number
  weapon: string
  weaponDmg: string
  toHit: number
  initiative: number
  specialAbility: string
}

const CharacterView = ({ characters : any }) => {
  const characterCards = characters.map(character => {
    return <CharacterCard
      name={character.name}
      class={character.class}
      HP={character.HP}
      AC={character.AC}
      weapon={character.weapon}
      weaponDmg={character.weaponDmg}
      toHit={character.toHit}
      initiative={character.initiative}
      specialAbility={character.specialAbility}
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
