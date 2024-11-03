import { useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayerGroup } from 'react-leaflet'

function OnMapClick() {
  const [clickedPosition, setClickedPosition] = useState<L.LatLng | null>(null)

  // const map = 
  useMapEvents({
    click: (e) => {
      setClickedPosition(e.latlng)
    }
  })

  return (
    <>
      {clickedPosition !== null &&
        <Marker position={[clickedPosition.lat, clickedPosition.lng]}></Marker>
      }
    </>
  )
}

export const MapSGGW = ({ userLocation }: {
  userLocation: GeolocationCoordinates | null
}) => {

  const sw = L.latLng(52.15656, 21.03624)
  const ne = L.latLng(52.16740, 21.05596)

  return (
    <MapContainer
      center={[52.16256, 21.04219]}
      maxBounds={L.latLngBounds(sw, ne)}
      zoom={16}
      minZoom={16}
      maxZoom={19}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation &&
        <Marker position={[userLocation.latitude, userLocation.longitude]}>
          <Popup>
            Popup
          </Popup>
        </Marker>
      }
      <OnMapClick/>
    </MapContainer>
  )
}

export default MapSGGW