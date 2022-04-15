import { useState, useEffect } from 'react'
import {
  rollDice,
  rollToHit,
  checkForHit,
  rollDamage,
  doDamage
} from '../../battle-utils'
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

  const [playerDmgRoll, setPlayerDmgRoll] = useState<string[]>(player.attackRoll)
  const [playerHP, setPlayerHP] = useState<number>(player.HP)
  const [playerCurrentHP, setPlayerCurrentHP] = useState<number>(player.HP)
  const [playerAC, setPlayerAC] = useState<number>(player.AC)
  const [playerWeapon, setPlayerWeapon] = useState<string>(player.weapon)
  const [playerInitiative, setPlayerInitiative] = useState<number>(player.initiative)
  const [playerToHit, setPlayerToHit] = useState<number>(player.toHit)
  const [playerSpecial, setPlayerSpecial] = useState<string>(player.specialAbility)
  const [playerInitiativeRoll, setPlayerInitiativeRoll] = useState<number | null>(null)
  const [playerPortrait, setPlayerPortrait] = useState<string>(player.portrait)

  //Monster variables ------------

  const [monster, setMonster] = useState<MonsterStats | null>(null)
  const [monsterName, setMonsterName] = useState<string | null>(null)
  const [monsterHP, setMonsterHP] = useState<number | null>(null)
  const [monsterCurrentHP, setMonsterCurrentHP] = useState<number | null>(null)
  const [monsterAC, setMonsterAC] = useState<number | null>(null)
  const [monsterActions, setMonsterActions] = useState<MonsterActions[] | null>(null)
  const [monsterInitiativeRoll, setMonsterInitiativeRoll] = useState<number | null>(null)
  const [monsterPortrait, setMonsterPortrait] = useState<string>('')

  // Globals ------------

  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean | null>(null)
  const [turnCount, setTurnCount] = useState<number>(0)
  const [isEndGame, setIsEndGame] = useState<boolean>(false)
  const [eventLog, setEventLog] = useState<string>(' ')
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)

  useEffect(() => {
    randomCritterGitter(monsters)
  }, [])

  useEffect(() => {
    monster && loadMonster(monster)
  }, [monster])

  useEffect(() => {
    monsterName && loadMonsterPortrait()
  }, [monsterName])

  useEffect(() => {
    if (!isPlayerTurn && !isEndGame && isGameStarted) {
      setEventLog('Monster is attacking...')
      setTimeout(monsterAttack, 2000)
    }
  }, [isPlayerTurn])

  useEffect(() => {
    checkEndGame()
    if (!isEndGame) {
      setIsPlayerTurn((previousState) => !previousState)
      setEventLog('Choose your attack')
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
    if (monster) {
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

  const rollForInitiative = () => {
    const playerRoll = rollDice(1, 20) + playerInitiative
    const monsterRoll = rollDice(1, 20)
    setIsPlayerTurn(() => (playerRoll >= monsterRoll ? true : false))
    setPlayerInitiativeRoll(playerRoll)
    setMonsterInitiativeRoll(monsterRoll)
    console.log(`player init: ${playerRoll}, monster: ${monsterRoll}`)
    setIsGameStarted(true)
  }

  const playerAttack = () => {
    if (!isEndGame) {
      console.log('player attack')
      if (monsterAC && monsterCurrentHP) {
        const ATKSuccess = rollToHit(playerToHit)
        if (checkForHit(ATKSuccess, monsterAC)) {
          console.log('player hit')
          let damage = rollDamage(playerDmgRoll)
          console.log(`player damage: ${damage}`)
          let newHP = doDamage(damage, monsterCurrentHP)
          setEventLog(
            `your roll: ${ATKSuccess} vs AC: ${monsterAC}, you hit for ${damage} damage!`
          )
          setMonsterCurrentHP(newHP)
        } else {
          setEventLog(`your roll: ${ATKSuccess} vs AC: ${monsterAC}, you miss!`)
          console.log('player miss')
        }
      }
      setTimeout(() => {
        setTurnCount((previous) => previous + 1)
      }, 3000)
    }
  }

  const monsterAttack = () => {
    if (!isEndGame && !isPlayerTurn) {
      if (monsterActions) {
        console.log('monster attacks')
        const index = rollDice(1, monsterActions.length) - 1
        const attack = monsterActions[index]
        const ATKSuccess = rollToHit(attack.toHit) + 5 // buffed here
        if (checkForHit(ATKSuccess, playerAC)) {
          let damage = rollDamage(attack.attackDmg)
          console.log(`monster damage: ${damage}`)
          let newHP = doDamage(damage, playerCurrentHP)
          setEventLog(
            `${monsterName} used ${attack.attackName}: ${ATKSuccess} vs your AC: ${playerAC}, they hit for ${damage} damage!`
          )
          setPlayerCurrentHP(newHP)
        } else {
          setEventLog(
            `${monsterName} used ${attack.attackName}: ${ATKSuccess} vs your AC: ${playerAC}, they missed!`
          )
          console.log('monster miss')
        }
      }
      setTimeout(() => {
        setTurnCount((previous) => previous + 1)
      }, 3000)
    }
  }

  const checkEndGame = () => {
    if (monsterCurrentHP || monsterCurrentHP === 0) {
      if (monsterCurrentHP <= 0) {
        setIsEndGame(true)
        setEventLog('You Won')
        console.log('player won')
      } else if (playerCurrentHP <= 0) {
        setIsEndGame(true)
        setEventLog('Monster Won')
        console.log('monster won')
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
          <div className='event-log'>
            {isGameStarted && <p className='event-log-text'>{eventLog}</p>}
            {!isGameStarted && (
              <button onClick={rollForInitiative}>roll for initiative</button>
            )}
          </div>
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
