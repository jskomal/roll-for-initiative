import Fighter from './images/Fighter.png'
import Cleric from './images/Cleric.png'
import Rogue from './images/Rogue.png'

export const CharacterData = [
  {
    id: 1,
    DnDClass: 'Fighter',
    name: 'Ragnar Hammerbane',
    HP: 28,
    AC: 17,
    weapon: 'Warhammer',
    weaponDmg: '1d10',
    toHit: 5,
    initiative: 2,
    bonusDmg: 3,
    attackRoll: ['1d10+3'],
    specialAbility: 'Multi Attack: Once per three turns, you may attack twice',
    portrait: Fighter
  },
  {
    id: 2,
    DnDClass: 'Cleric',
    name: 'Zinyrae the Holy',
    HP: 24,
    AC: 18,
    weapon: 'Mace',
    weaponDmg: '1d8',
    toHit: 5,
    initiative: 1,
    bonusDmg: 3,
    attackRoll: ['1d8+3'],
    specialAbility:
      'Healing Word: Once per three turns, you may use this bonus action which regains 1d4+2 HP',
    portrait: Cleric
  },
  {
    id: 3,
    DnDClass: 'Rogue',
    name: 'Vaara Nightblade',
    HP: 18,
    AC: 14,
    weapon: 'Dagger',
    weaponDmg: '1d4',
    toHit: 5,
    initiative: 6,
    bonusDmg: 3,
    attackRoll: ['1d4+3'],
    specialAbility:
      'Sneak Attack: Once per three turns, you may use this bonus action to 2d6 damage',
    portrait: Rogue
  }
]
