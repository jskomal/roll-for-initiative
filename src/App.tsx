import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { fetchAPI } from './ApiCalls'
import './App.css'
import CharacterView from './components/CharacterView/CharacterView'
import welcomeGif from './images/rainruins.gif'

interface Props {}

interface State {
  characters: CharacterStats[]
  monsters: MonsterStats[]
  errorMsg: string
}

interface CharacterStats {
  class: string
  name: string
  HP: number
  AC: number
  weapon: string
  weaponDmg: string
  toHit: number
  initiative: number
  specialAbility: string
}

interface MonsterStats {
  name: string
  HP: number
  AC: number
  actions: MonsterActions[]
}

interface MonsterActions {
  attackName: string
  toHit: number
  attackDmg: string
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

export class App extends Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      characters: [
        {
          class: 'fighter',
          name: 'Bob',
          HP: 28,
          AC: 17,
          weapon: 'warhammer',
          weaponDmg: '1d10',
          toHit: 5,
          initiative: 2,
          specialAbility: 'Multiattack: Once per three turns, you may attack twice'
        },
        {
          class: 'cleric',
          name: 'Brea',
          HP: 24,
          AC: 18,
          weapon: 'mace',
          weaponDmg: '1d8',
          toHit: 5,
          initiative: 1,
          specialAbility:
            'Healing Word: Once per three turns, you may use this bonus action which regains 1d4+2 HP'
        },
        {
          class: 'rogue',
          name: 'Swashbuckler Sam',
          HP: 18,
          AC: 14,
          weapon: 'dagger',
          weaponDmg: '1d4',
          toHit: 5,
          initiative: 6,
          specialAbility:
            'Cunning Dodge: Once per three turns, you may use this bonus action to negate half the damage from the next attack'
        }
      ],
      monsters: [],
      errorMsg: ''
    }
  }

  componentDidMount() {
    this.fetchMonsters()
  }

  fetchMonsters = () => {
    const monsters = [
      'monsters/bat',
      'monsters/goblin',
      'monsters/gray-ooze',
      'monsters/ghoul',
      'monsters/brown-bear'
    ]

    monsters.forEach((monsterPath) => {
      fetchAPI(monsterPath)
        .then((res) => {
          if (!res.ok) {
            this.setState({ errorMsg: 'Something went wrong, please try again later!' })
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
          this.setState({ monsters: [...this.state.monsters, newMonster] })
        })
    })
  }

  render() {
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
          <CharacterView characters={this.state.characters}/>
        </Route>
      </Switch>
    )
  }
}

export default App
