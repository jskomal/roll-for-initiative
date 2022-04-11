import Fighter from './images/Fighter.png'
import Cleric from './images/Cleric.png'
import Rogue from './images/Rogue.png'


export const CharacterData = [
  {
    DnDClass: 'Fighter',
    name: 'Ragnar Hammerbane',
    HP: 28,
    AC: 17,
    weapon: 'warhammer',
    weaponDmg: '1d10',
    toHit: 5,
    initiative: 2,
    bonusDmg: 3,
    specialAbility: 'Multiattack: Once per three turns, you may attack twice',
    portrait: Fighter
  },
  {
    DnDClass: 'Cleric',
    name: 'Zinyrae the Holy',
    HP: 24,
    AC: 18,
    weapon: 'mace',
    weaponDmg: '1d8',
    toHit: 5,
    initiative: 1,
    bonusDmg: 3,
    specialAbility:
      'Healing Word: Once per three turns, you may use this bonus action which regains 1d4+2 HP',
    portrait: Cleric
  },
  {
    DnDClass: 'Rogue',
    name: 'Vaara Nightblade',
    HP: 18,
    AC: 14,
    weapon: 'dagger',
    weaponDmg: '1d4',
    toHit: 5,
    initiative: 6,
    bonusDmg: 3,
    specialAbility:
      'Cunning Dodge: Once per three turns, you may use this bonus action to negate half the damage from the next attack',
      portrait: Rogue
  }
]