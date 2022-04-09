import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import './App.css'
import welcomeGif from './images/rainruins.gif'

export class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/'>
          <section className='welcome-view'>
            <img className='welcome-gif' src={welcomeGif} alt='Rainy ruins' />
            <h1 className='main-title'>hail and well met, traveler...</h1>
            <Link to='/character-select'>
              <button className='enter-button'>roll for initiative</button>
            </Link>
          </section>
        </Route>
        <Route path='/character-select'>
          <section className='character-view'></section>
        </Route>
      </Switch>
    )
  }
}

export default App
