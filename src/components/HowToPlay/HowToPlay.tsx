import React from 'react'
import { Link } from 'react-router-dom'
import './HowToPlay.css'

const HowToPlay = () => {
  return (
    <div className='howToPlay-page'>
      <h1 className='howToPlay-title'>Welcome to Roll for Initiative!</h1>
      <p>
        Choose your champion. Fight for glory and honor!
        <br />
        <br />
        Your champion can be one of three classic character types:
        <br />
        <br />
        The Fighter: This brawler deals brutal damage with their mighty
        warhammer. Use their special ability to attack twice in a turn once
        every three turns.
        <br />
        <br />
        The Cleric: This tank smashes through armor with their ferocious mace,
        and can use their special ability to heal themselves in battle once
        every three turns.
        <br />
        <br />
        The Rogue: This nimble thief is a dangerous foe, whittling down their
        opponent's defenses with a thousand cuts! Use their special ability to
        deal sneak attack damage once every three turns. Guaranteed to hit!
        <br />
        <br />
        Each champion has unique stats that help them in combat: Hit modifier:
        Adds a bonus to your attack rolls to make it easier for you to hit your
        target.
        <br />
        <br />
        Damage modifier: Adds a bonus to your damage rolls so that you deal more
        damage in total.
        <br />
        <br />
        Initiative modifier: Adds a bonus to your initiative rolls to make it
        more likely that your character goes first in combat.
        <br />
        <br />
        Once you've chosen your champion, you will pit your strength against
        your enemy in single combat!
        <br />
        <br />
        Roll for initiative, determining who goes first in combat.
        <br />
        <br />
        On your turn, you may attack and use your special ability (which can be
        used once every three turns). Please note that your turn ends when you
        attack normally, so use your special ability first!
        <br />
        <br />
        When you attack, you roll a 20 sided die and add your hit modifier. This
        is compared to your enemy's Armor Class (AC). If your roll is higher or
        equal to the enemy's AC, you hit. If not, your strike misses.
        <br />
        <br />
        If you hit your opponent, damage will be rolled using your weapon's
        stats. Your damage modifier is added to this number and the total is
        subtracted from your opponent's HP.
        <br />
        <br />
        On your opponent's turn, they will attack with zeal. Steel yourself for
        combat!
        <br />
        <br />
        Reduce your opponent's HP to zero before you are knocked out to win!
      </p>
      <Link to='/character-select'>
        <button className='proceed-to-characters-button'>
          choose your champion
        </button>
      </Link>
    </div>
  )
}

export default HowToPlay
