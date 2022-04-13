import { CharacterStats } from '../../App'
import CharacterCard from '../CharacterCard/CharacterCard'
import './CharacterView.css'

interface CharacterViewProps {
  characters: CharacterStats[]
  selectCharacter: (id: number) => void
}

const CharacterView = ({ characters, selectCharacter }: CharacterViewProps) => {
  const characterCards = characters.map(character => {
    return (
      <CharacterCard
        key={character.id.toString()}
        id={character.id}
        DnDClass={character.DnDClass}
        name={character.name}
        HP={character.HP}
        AC={character.AC}
        weapon={character.weapon}
        weaponDmg={character.weaponDmg}
        toHit={character.toHit}
        initiative={character.initiative}
        bonusDmg={character.bonusDmg}
        attackRoll={character.attackRoll}
        specialAbility={character.specialAbility}
        portrait={character.portrait}
        selectCharacter={selectCharacter}
      />
    )
  })

  return (
    <section className='character-page'>
      <h1 className='choose-text'>Choose your champion!</h1>
      <div className='character-container'>{characterCards}</div>
    </section>
  )
}

export default CharacterView
