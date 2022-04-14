import { useState, useEffect } from 'react'
// import {
//   rollDice,
//   rollToHit,
//   checkForHit,
//   rollDamage,
//   doDamage,
//   healingWord
// } from '../../battle-utils'
import { CharacterStats, MonsterStats } from '../../App'
import './BattleGround.css'

interface BattleGroundProps {
  selectedCharacter: CharacterStats
  monsters: MonsterStats[]
}

const BattleGround = ({ selectedCharacter, monsters }: BattleGroundProps) => {
  let player = selectedCharacter

  //Player variables ------------

  const [playerDmgRoll, setPlayerDmgRoll] = useState<string[]>(
    player.attackRoll
  )
  const [playerHP, setPlayerHP] = useState<number>(player.HP)
  const [playerCurrentHP, setPlayerCurrentHP] = useState<number>(player.HP)
  const [playerAC, setPlayerAC] = useState<number>(player.AC)
  const [playerWeapon, setPlayerWeapon] = useState<string>(player.weapon)
  const [playerInitiative, setPlayerInitiative] = useState<number>(
    player.initiative
  )
  const [playerToHit, setPlayerToHit] = useState<number>(player.toHit)
  const [playerSpecial, setPlayerSpecial] = useState<string>(
    player.specialAbility
  )
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true)
  const [playerInitiativeRoll, setPlayerInitiativeRoll] = useState<
    number | null
  >(null)
  const [playerPortrait, setPlayerPortrait] = useState<string>(player.portrait)

  //Monster variables ------------

  const [monster, setMonster] = useState<MonsterStats | null>(null)
  const [monsterName, setMonsterName] = useState<string | null>(null)
  const [monsterHP, setMonsterHP] = useState<number | null>(null)
  const [monsterCurrentHP, setMonsterCurrentHP] = useState<number | null>(null)
  const [monsterAC, setMonsterAC] = useState<number | null>(null)
  // const [monsterActions, setMonsterActions] = useState<number | null>(null)
  const [monsterInitiativeRoll, setMonsterInitiativeRoll] = useState<
    number | null
  >(null)

  useEffect(() => {
    randomCritterGitter(monsters)
    rollForInitiative()
  }, [])

  useEffect(() => {
    monster && loadMonster(monster)
  }, [monster])

  const randomCritterGitter = (array: MonsterStats[]) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    setMonster(array[randomIndex])
  }

  const loadMonster = (monster: MonsterStats) => {
    monster && setMonsterName(monster.name)
    monster && setMonsterHP(monster.HP)
    monster && setMonsterAC(monster.AC)
    monster && setMonsterCurrentHP(monster.HP)
  }

  const parseDMGInput = (DMGInput: string[]): number[] => {
    let split1 = DMGInput[0].split('d')
    let split2 = split1[1].split('+')
    let numOfDice = parseInt(split1[0])
    let sizeOfDice = parseInt(split2[0])
    let DMGBonus = parseInt(split2[1])
    return [numOfDice, sizeOfDice, DMGBonus]
  }

  const rollForInitiative = () => {
    const playerRoll = rollDice(1, 20) + playerInitiative
    const monsterRoll = rollDice(1, 20)
    setIsPlayerTurn(() => (playerRoll >= monsterRoll ? true : false))
    setPlayerInitiativeRoll(playerRoll)
    setMonsterInitiativeRoll(monsterRoll)
  }

  const rollDice = (numDice: number, diceSize: number): number => {
    let sum = 0
    for (let i = 0; i < numDice; i++) {
      sum += Math.floor(Math.random() * diceSize) + 1
    }
    return sum
  }

  const rollToHit = (toHit: number): number => {
    return rollDice(1, 20) + toHit
  }

  const checkForHit = (rollToHitResult: number, targetAC: number): boolean => {
    return rollToHitResult >= targetAC ? true : false
  }

  const rollDamage = (DMGInput: string[]): number => {
    let dice = parseDMGInput(DMGInput)
    return rollDice(dice[0], dice[1]) + dice[2]
  }

  const doDamage = (totalDamage: number, targetHP: number): number => {
    return targetHP - totalDamage
  }

  // PlayerTurn sequires monster AC in place of the number 10

  const playerAttack = () => {
    const ATKSuccess = rollToHit(playerToHit)
    if (checkForHit(ATKSuccess, 10)) {
      let damage = rollDamage(playerDmgRoll)
      let newHP = doDamage(damage, 20)
      // setMonsterHP(newHP)
    }
    setIsPlayerTurn(false)
  }

  return (
    <>
      {monster && (
        <div className='battleground'>
          <div className='monster-box'>
            <div className='monster-display'>
              {monsterCurrentHP && monsterHP && (
                <>
                  <progress
                    id='monster-hp'
                    value={monsterCurrentHP.toString()}
                    max={monsterHP.toString()}
                  ></progress>
                  <p>
                    {monsterCurrentHP} / {monsterHP}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className='event-log'>event log</div>
          <div className='character-box'>
            <div className='character-display'>
              <progress
                id='player-hp'
                value={playerCurrentHP.toString()}
                max={playerHP.toString()}
              ></progress>
              <p>
                {playerCurrentHP} / {playerHP}
              </p>
              <img
                className='player-portrait'
                src={playerPortrait}
                alt='player portrait'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BattleGround
