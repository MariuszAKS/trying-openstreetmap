import { useState } from 'react'
import Map from './assets/components/Map'
import './App.css'

function App() {
  return (
    <>
      <h1>Map app based on OpenStreetMap</h1>
        <div className='MapContainer'>
          <Map></Map>
        </div>
    </>
  )
}

export default App
