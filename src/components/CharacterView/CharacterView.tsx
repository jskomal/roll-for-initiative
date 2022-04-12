import { CharacterStats } from '../../App';
import CharacterCard from '../CharacterCard/CharacterCard';
import './CharacterView.css';

interface CharacterViewProps {
  characters: CharacterStats[];
}

const CharacterView = ({ characters }: CharacterViewProps) => {
  const characterCards = characters.map((character) => {
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
        specialAbility={character.specialAbility}
        portrait={character.portrait}
      />
    );
  });

  return (
    <section className="character-page">
      <h1 className="choose-text">Choose your champion!</h1>
      <div className="character-container">{characterCards}</div>
    </section>
  );
};

export default CharacterView;
