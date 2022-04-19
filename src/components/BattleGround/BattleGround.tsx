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
import { Redirect } from 'react-router-dom'

interface BattleGroundProps {
  selectedCharacter: CharacterStats
  monsters: MonsterStats[]
}

const BattleGround = ({ selectedCharacter, monsters }: BattleGroundProps) => {
  let player = selectedCharacter

  //Player variables ------------

  const [playerName, setPlayerName] = useState<string>(player.name)
  const [playerDmgRoll, setPlayerDmgRoll] = useState<string[]>(player.attackRoll)
  const [playerDnDClass, setPlayerDnDClass] = useState<string>(player.DnDClass)
  const [playerHP, setPlayerHP] = useState<number>(player.HP)
  const [playerCurrentHP, setPlayerCurrentHP] = useState<number>(player.HP)
  const [playerAC, setPlayerAC] = useState<number>(player.AC)
  const [playerWeapon, setPlayerWeapon] = useState<string>(player.weapon)
  const [playerInitiative, setPlayerInitiative] = useState<number>(player.initiative)
  const [playerToHit, setPlayerToHit] = useState<number>(player.toHit)
  const [playerSpecial, setPlayerSpecial] = useState<string>(player.specialAbility)
  const [playerPortrait, setPlayerPortrait] = useState<string>(player.portrait)
  const [playerSpecialCooldown, setPlayerSpecialCooldown] = useState<number>(0)

  //Monster variables ------------

  const [monster, setMonster] = useState<MonsterStats | null>(null)
  const [monsterName, setMonsterName] = useState<string | null>(null)
  const [monsterHP, setMonsterHP] = useState<number | null>(null)
  const [monsterCurrentHP, setMonsterCurrentHP] = useState<number | null>(null)
  const [monsterAC, setMonsterAC] = useState<number | null>(null)
  const [monsterActions, setMonsterActions] = useState<MonsterActions[] | null>(null)
  const [monsterPortrait, setMonsterPortrait] = useState<string>('')

  // Globals ------------

  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean | null>(null)
  const [turnCount, setTurnCount] = useState<number>(0)
  const [isMonsterEndGame, setIsMonsterEndGame] = useState<boolean>(false)
  const [isPlayerEndGame, setIsPlayerEndGame] = useState<boolean>(false)
  const [eventLog, setEventLog] = useState<string>(' ')
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [isAttackClicked, setIsAttackClicked] = useState<boolean>(false)

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
    if (!isPlayerTurn && !isMonsterEndGame && !isPlayerEndGame && isGameStarted) {
      setTimeout(() => {
        setEventLog(`${monsterName} is attacking...`)
      }, 1000)
      setTimeout(monsterAttack, 2000)
    }
  }, [isPlayerTurn])

  useEffect(() => {
    if (monsterCurrentHP !== null) {
      if (playerCurrentHP <= 0) {
        setEventLog('You Died.')
      } else if (monsterCurrentHP <= 0) {
        setEventLog('Victory!!!')
      }
    }
    setTimeout(() => {
      checkEndGame()
    }, 2000)
  }, [playerCurrentHP, monsterCurrentHP])

  useEffect(() => {
    if (!isPlayerTurn) setEventLog('Choose your attack')
    if (!isMonsterEndGame && !isPlayerEndGame) {
      setIsPlayerTurn((previousState) => !previousState)
    }
    setPlayerSpecialCooldown((prevCount) => {
      if (playerSpecialCooldown > 0) {
        return prevCount - 1
      } else {
        return prevCount
      }
    })
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
          break
      }
    }
  }

  const rollForInitiative = () => {
    const playerRoll = rollDice(1, 20) + playerInitiative
    const monsterRoll = rollDice(1, 20)
    setIsPlayerTurn(() => (playerRoll >= monsterRoll ? true : false))
    if (playerRoll >= monsterRoll) {
      setEventLog(
        `You rolled ${playerRoll} to the ${monsterName}'s ${monsterRoll}. You attack first!`
      )
      setIsGameStarted(true)
    } else if (monsterRoll > playerRoll) {
      setEventLog(
        `The ${monsterName} rolled ${monsterRoll} to your ${playerRoll}.  Prepare to Defend!`
      )
      setIsGameStarted(true)
    }
  }

  const playerAttack = () => {
    if (!isMonsterEndGame && !isPlayerEndGame) {
      setIsAttackClicked(true)
      if (monsterAC && monsterCurrentHP) {
        const ATKSuccess = rollToHit(playerToHit)
        if (checkForHit(ATKSuccess, monsterAC)) {
          let damage = rollDamage(playerDmgRoll)
          let newHP = doDamage(damage, monsterCurrentHP)
          setEventLog(
            `${
              playerName.split(' ')[0]
            } used ${playerWeapon}: ${ATKSuccess} vs AC: ${monsterAC}, you hit for ${damage} damage!`
          )
          setMonsterCurrentHP(newHP)
        } else {
          setEventLog(
            `${
              playerName.split(' ')[0]
            } used ${playerWeapon}: ${ATKSuccess} vs AC: ${monsterAC}, you miss!`
          )
        }
      }
      setTimeout(() => {
        setIsAttackClicked(false)
        setTurnCount((previous) => previous + 1)
      }, 3000)
    }
  }

  const monsterAttack = () => {
    if (!isMonsterEndGame && !isPlayerEndGame && !isPlayerTurn) {
      if (monsterActions) {
        const index = rollDice(1, monsterActions.length) - 1
        const attack = monsterActions[index]
        const ATKSuccess = rollToHit(attack.toHit) + 5 // buffed here
        if (checkForHit(ATKSuccess, playerAC)) {
          let damage = rollDamage(attack.attackDmg)
          let newHP = doDamage(damage, playerCurrentHP)
          setEventLog(
            `${monsterName} used ${attack.attackName}: ${ATKSuccess} vs your AC: ${playerAC}, they hit for ${damage} damage!`
          )
          setPlayerCurrentHP(newHP)
        } else {
          setEventLog(
            `${monsterName} used ${attack.attackName}: ${ATKSuccess} vs your AC: ${playerAC}, they missed!`
          )
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
        setIsPlayerEndGame(true)
      } else if (playerCurrentHP <= 0) {
        setIsMonsterEndGame(true)
      }
    }
  }

  const clickSpecial = () => {
    if (playerDnDClass === 'Fighter') {
      fighterSpecial()
    } else if (playerDnDClass === 'Cleric') {
      clericSpecial()
    } else if (playerDnDClass === 'Rogue') {
      rogueSpecial()
    }
    setPlayerSpecialCooldown(6)
  }

  // Special attacks

  const fighterSpecial = () => {
    if (!isMonsterEndGame && !isPlayerEndGame) {
      if (monsterAC && monsterCurrentHP) {
        const ATKSuccess = rollToHit(playerToHit)
        if (checkForHit(ATKSuccess, monsterAC)) {
          let damage = rollDamage(playerDmgRoll)
          let newHP = doDamage(damage, monsterCurrentHP)
          setEventLog(
            `${
              playerName.split(' ')[0]
            } used Multi Attack: ${ATKSuccess} vs AC: ${monsterAC}, you hit for ${damage} damage! Attack Again!`
          )
          setMonsterCurrentHP(newHP)
        } else {
          setEventLog(
            `${
              playerName.split(' ')[0]
            } used Multi Attack: ${ATKSuccess} vs AC: ${monsterAC}, you miss! Attack Again!`
          )
        }
      }
    }
  }

  const clericSpecial = () => {
    const healingAmount = rollDice(1, 4) + 2
    setPlayerCurrentHP((prevHP) => {
      if (prevHP + healingAmount >= playerHP) {
        return playerHP
      } else {
        return prevHP + healingAmount
      }
    })
    setEventLog(
      `${
        playerName.split(' ')[0]
      } used Healing Word, and healed for ${healingAmount} HP. Strike down your foe!`
    )
  }

  const rogueSpecial = () => {
    if (monsterCurrentHP) {
      let damage = rollDice(2, 6)
      let newHP = doDamage(damage, monsterCurrentHP)
      setEventLog(
        `${
          playerName.split(' ')[0]
        } used Sneak Attack, you deftly strike for ${damage} damage! Attack Again!`
      )
      setMonsterCurrentHP(newHP)
    }
  }

  return (
    <>
      {monster && (
        <div className='battleground'>
          <div className='monster-box'>
            <div className='monster-display'>
              {monsterCurrentHP !== null && monsterHP !== null && (
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
                disabled={!isPlayerTurn || !isGameStarted || isAttackClicked}
              >
                Attack with {playerWeapon}
              </button>
              <button
                className='attack-button'
                onClick={() => clickSpecial()}
                disabled={
                  !isPlayerTurn ||
                  !isGameStarted ||
                  playerSpecialCooldown !== 0 ||
                  isAttackClicked ||
                  (playerDnDClass === 'Cleric' && playerCurrentHP === playerHP)
                }
              >
                {playerSpecial.split(' ')[0]} {playerSpecial.split(' ')[1].slice(0, -1)}
              </button>
            </div>
          </div>
          {isMonsterEndGame && <Redirect to='/monster-end-game'></Redirect>}
          {isPlayerEndGame && <Redirect to='/player-end-game'></Redirect>}
        </div>
      )}
    </>
  )
}

export default BattleGround
