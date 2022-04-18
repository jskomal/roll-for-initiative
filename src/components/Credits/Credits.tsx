import React from 'react'
import { Link } from 'react-router-dom'

const Credits = () => {
  return (
    <div className='howToPlay-page'>
      <h1 className='howToPlay-title'>Credits</h1>
      <p>written by:</p>
      <br />
      <p>Emili Kaiman</p>
      <p>Francesca McConnell</p>
      <p>George Lemmon</p>
      <p>Jordan Skomal</p>
      <br />
      <p>music by:</p>
      <br />
      <p>Jordan Skomal</p>
      <br />
      <Link to='/'>
        <button>Home</button>
      </Link>
    </div>
  )
}

export default Credits
