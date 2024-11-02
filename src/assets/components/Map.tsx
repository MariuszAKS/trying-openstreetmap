import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

export const Map = ({ userLocation }: {
  userLocation: GeolocationCoordinates | null
}) => {
  
  return (
    <MapContainer center={[52.24, 21.01]} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {userLocation &&
        <Marker position={[userLocation.latitude, userLocation.longitude]}>
          <Popup>
            Popup
          </Popup>
        </Marker>
      }
    </MapContainer>
  )
}

export default Map