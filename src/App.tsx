import { useState, useEffect } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { fetchAPI } from './ApiCalls'
import './App.css'
import CharacterView from './components/CharacterView/CharacterView'
import BattleGround from './components/BattleGround/BattleGround'
import PlayerEndGameScreen from './components/PlayerEndGameScreen/PlayerEndGameScreen'
import MonsterEndGameScreen from './components/MonsterEndGameScreen/MonsterEndGameScreen'
import welcomeGif from './images/rainruins.gif'
import { CharacterData } from './CharacterData'

export interface CharacterStats {
  id: number
  DnDClass: string
  name: string
  HP: number
  AC: number
  weapon: string
  weaponDmg: string
  toHit: number
  initiative: number
  bonusDmg: number
  attackRoll: string[]
  specialAbility: string
  portrait: string
}

export interface MonsterStats {
  name: string
  HP: number
  AC: number
  actions: MonsterActions[]
}

export interface MonsterActions {
  attackName: string
  toHit: number
  attackDmg: string[]
}

interface fetchMonsterAction {
  attack_bonus: number
  damage: Damage[]
  desc: string
  name: string
}

interface Damage {
  damage_dice: string
  damage_type: object
}

export const App = () => {
  const [characters, setCharacters] = useState<CharacterStats[]>(CharacterData)
  const [monsters, setMonsters] = useState<MonsterStats[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterStats | null>(null)

  useEffect(() => {
    fetchMonsters()
  }, [])

  const fetchMonsters = () => {
    const monsters = [
      'monsters/zombie',
      'monsters/goblin',
      'monsters/dire-wolf',
      'monsters/ghoul',
      'monsters/bugbear'
    ]

    monsters.forEach((monsterPath) => {
      fetchAPI(monsterPath)
        .then((res) => {
          if (!res.ok) {
            setErrorMessage('Something went wrong, please try again later!')
          } else {
            return res.json()
          }
        })
        .then((monsterData) => {
          const newMonster = {
            name: monsterData.name,
            HP: monsterData.hit_points,
            AC: monsterData.armor_class,
            actions: monsterData.actions.map((action: fetchMonsterAction) => {
              return {
                attackName: action.name,
                toHit: action.attack_bonus,
                attackDmg: action.damage.map((damageItem) => damageItem.damage_dice)
              }
            })
          }
          setMonsters((previousMonsters) => [...previousMonsters, newMonster])
        })
    })
  }

  const selectCharacter = (id: number): void => {
    let chosenCharacter = characters.find((character) => character.id === id)
    if (chosenCharacter) {
      setSelectedCharacter(chosenCharacter)
    }
  }

  return (
    <Switch>
      <Route exact path='/'>
        <section className='welcome-view'>
          <img className='welcome-gif' src={welcomeGif} alt='Rainy ruins' />
          <h1 className='main-title'>hail and well met, traveler...</h1>
          <Link to='/character-select'>
            <button className='enter-button'>roll for initiative</button>
          </Link>
        </section>
      </Route>
      <Route exact path='/character-select'>
        <CharacterView characters={characters} selectCharacter={selectCharacter} />
      </Route>
      <Route exact path='/battle-ground'>
        {selectedCharacter && monsters && (
          <BattleGround selectedCharacter={selectedCharacter} monsters={monsters} />
        )}
      </Route>
      <Route exact path='/monster-end-game'>
          <MonsterEndGameScreen />
      </Route>
      <Route exact path='/player-end-game' >
          <PlayerEndGameScreen />
      </Route>
    </Switch>
  )
}

export default App
