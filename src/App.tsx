import { useState } from 'react'
import Map from './assets/components/Map'
import './App.css'

function App() {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null)

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords)
        },
        (error) => {
          alert('Couldn\'t retrieve user\'s location: ' + error)
        }
      )
    }
    else {
      alert('Geolocation not supported in this browser.')
    }
  }

  return (
    <>
      <h1>Map app based on OpenStreetMap</h1>
      <div className='MapContainer'>
        <Map userLocation={userLocation}></Map>
      </div>
      <button onClick={getUserLocation}>Get user location</button>
    </>
  )
}

export default App