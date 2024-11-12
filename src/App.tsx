import { useState } from 'react'
import MapSGGW from './assets/components/MapSGGW'
import L from 'leaflet'
import './App.css'

function App() {
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null)
  const [markerType, setMarkerType] = useState<'location' | 'destination'>('location')

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(L.latLng(position.coords.latitude, position.coords.longitude))
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

  const changeMarkerType = () => {
    if (markerType === 'location')
      setMarkerType('destination')
    else setMarkerType('location')
  }

  return (
    <>
      <h1>Map app based on OpenStreetMap</h1>
      <div className='MapContainer'>
        <MapSGGW userLocation={userLocation} markerType={markerType}></MapSGGW>
      </div>
      <button onClick={getUserLocation}>Get user location</button>
      <button onClick={changeMarkerType}>{markerType}</button>
    </>
  )
}

export default App