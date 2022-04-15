import { useState, useEffect } from 'react'
// import {
//   rollDice,
//   rollToHit,
//   checkForHit,
//   rollDamage,
//   doDamage,
//   healingWord
// } from '../../battle-utils'
import { CharacterStats, MonsterActions, MonsterStats } from '../../App'
import './BattleGround.css'
import ghoul from '../../images/Ghoul.png'
import direwolf from '../../images/Direwolf.png'
import goblin from '../../images/Goblin.png'
import bugbear from '../../images/Bugbear.png'
import zombie from '../../images/Zombie.png'

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
  const [turnCount, setTurnCount] = useState<number>(0)

  //Monster variables ------------

  const [monster, setMonster] = useState<MonsterStats | null>(null)
  const [monsterName, setMonsterName] = useState<string | null>(null)
  const [monsterHP, setMonsterHP] = useState<number | null>(null)
  const [monsterCurrentHP, setMonsterCurrentHP] = useState<number | null>(null)
  const [monsterAC, setMonsterAC] = useState<number | null>(null)
  const [monsterActions, setMonsterActions] = useState<MonsterActions[] | null>(
    null
  )
  const [monsterInitiativeRoll, setMonsterInitiativeRoll] = useState<
    number | null
  >(null)
  const [monsterPortrait, setMonsterPortrait] = useState<string>('')

  const [isEndGame, setIsEndGame] = useState<boolean>(false)
  const [eventLog, setEventLog] = useState<string>(' ')

  useEffect(() => {
    randomCritterGitter(monsters)
    rollForInitiative()
    // setTimeout(loadMonsterPortrait(), 200)
  }, [])

  useEffect(() => {
    monster && loadMonster(monster)
   
  }, [monster])

  useEffect(() => { 
    loadMonsterPortrait()
  }, [monsterName !== null]) 

  useEffect(() => {
    if (!isPlayerTurn && !isEndGame) {
      setEventLog('Monster is attacking...')
      setTimeout(monsterAttack, 2000)
    }
  }, [isPlayerTurn])

  useEffect(() => {
    checkEndGame()
    if (!isEndGame) {
      setIsPlayerTurn(previousState => !previousState)
      // setEventLog('Choose your attack')
    }
  }, [turnCount])

  

  const randomCritterGitter = (array: MonsterStats[]) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    setMonster(array[randomIndex])
  }

  const loadMonster = (monster: MonsterStats) => {
    monster && setMonsterName(monster.name)
    monster && setMonsterHP(monster.HP)
    monster && setMonsterAC(monster.AC)
    monster && setMonsterCurrentHP(monster.HP)
    monster && setMonsterActions(monster.actions)
  }

  const loadMonsterPortrait = () => {
    console.log('find portraint here')
    if (monster) {
      console.log(monsterName)
      switch (monsterName) {
        case 'Ghoul':
          setMonsterPortrait(ghoul)
          break
        case 'Goblin':
          setMonsterPortrait(goblin)
          break
        case 'Dire Wolf':
          setMonsterPortrait(direwolf)
          break
        case 'Zombie':
          setMonsterPortrait(zombie)
          break
        case 'Bugbear':
          setMonsterPortrait(bugbear)
      }
    }
  }

  const parseDMGInput = (DMGInput: string[]): number[] => {
    let split1 = DMGInput[0].split('d')
    let split2 = split1[1].split('+')
    let numOfDice = parseInt(split1[0])
    let sizeOfDice = parseInt(split2[0])
    let DMGBonus = parseInt(split2[1])
    return [numOfDice, sizeOfDice, DMGBonus || 0]
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

  const playerAttack = () => {
    if (!isEndGame) {
      console.log('fired')
      if (monsterAC && monsterCurrentHP) {
        const ATKSuccess = rollToHit(playerToHit)
        if (checkForHit(ATKSuccess, monsterAC)) {
          console.log('hit')
          let damage = rollDamage(playerDmgRoll)
          let newHP = doDamage(damage, monsterCurrentHP)
          setMonsterCurrentHP(newHP)
        }
        // checkEndGame()
        // if (!isEndGame) {
        //   setIsPlayerTurn(false)
        // }
      }
      setTurnCount(previous => previous + 1)
    }
  }

  const monsterAttack = () => {
    if (!isEndGame) {
      if (monsterActions) {
        const index = rollDice(1, monsterActions.length) - 1
        const attack = monsterActions[index]
        const ATKSuccess = rollToHit(attack.toHit) + 5
        if (checkForHit(ATKSuccess, playerAC)) {
          let damage = rollDamage(attack.attackDmg)
          let newHP = doDamage(damage, playerCurrentHP)
          setPlayerCurrentHP(newHP)
        }
      }
      setTurnCount(previous => previous + 1)
      // checkEndGame()
      // if (!isEndGame) {
      //   setIsPlayerTurn(true)
      //   setEventLog('Choose your attack')
      // }
    }
  }

  const checkEndGame = () => {
    if (monsterCurrentHP || monsterCurrentHP === 0) {
      if (monsterCurrentHP <= 0) {
        setIsEndGame(true)
        setEventLog('You Won')
        console.log('player')
      } else if (playerCurrentHP <= 0) {
        setIsEndGame(true)
        setEventLog('Monster Won')
        console.log('monster')
      }
    }
  }

  return (
    <>
      {monster && (
        <div className='battleground'>
          <div className='monster-box'>
            <div className='monster-display'>
              {monsterCurrentHP && monsterHP && (
                <>
                  <h2 className='monster-name'>{monsterName}</h2>
                  <img className='monster-img' src={monsterPortrait}></img>
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
          <div className='event-log'>{eventLog}</div>
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
            <div className='button-section'>
              <button
                className='attack-button button'
                onClick={() => playerAttack()}
                disabled={!isPlayerTurn}
              >
                Attack!
              </button>
              <button className='attack-button' disabled={!isPlayerTurn}>
                Special Attack
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BattleGround
