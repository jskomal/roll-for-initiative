import { useState, useEffect } from 'react'
import {
  rollDice,
  rollToHit,
  checkForHit,
  rollDamage,
  doDamage,
  healingWord
} from '../../battle-utils'
import { CharacterStats } from '../../App'

interface BattleGroundProps {
  selectedCharacter: CharacterStats
}

const BattleGround = ({ selectedCharacter }: BattleGroundProps) => {
  let player = selectedCharacter

  const [playerDmgRoll, setPlayerDmgRoll] = useState<string[]>(
    player.attackRoll
  )
  const [playerHP, setPlayerHP] = useState<number>(player.HP)
  const [playerAC, setPlayerAC] = useState<number>(player.AC)
  const [playerWeapon, setPlayerWeapon] = useState<string>(player.weapon)
  const [playerInitiative, setPlayerInitiative] = useState<number>(
    player.initiative
  )
  const [playerToHit, setPlayerToHit] = useState<number>(player.toHit)
  const [playerSpecial, setPlayerSpecial] = useState<string>(
    player.specialAbility
  )

  return (
    <div>
      <h1>Hello!</h1>
    </div>
  )
}

export default BattleGround
