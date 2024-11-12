import { useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, LayerGroup } from 'react-leaflet'
import 'leaflet-routing-machine'
// import './MapSGGW.css'

const Routing = ({ location, destination }: {
  location: L.LatLng | null
  destination: L.LatLng | null
}) => {
  const map = useMap()
  
  useEffect(() => {
    if (!map) return

    if (location === null || destination === null) return

    L.Routing.control({
      waypoints: [
        L.latLng(location.lat, location.lng),
        L.latLng(destination.lat, destination.lng)
      ],
      routeWhileDragging: true,
      show: false,
    }).addTo(map)
    
  }, [map, location, destination])

  return null
}

function OnMapClick({ markerType, setLocation, setDestination }: {
  markerType: 'location' | 'destination'
  setLocation: React.Dispatch<React.SetStateAction<L.LatLng | null>>
  setDestination: React.Dispatch<React.SetStateAction<L.LatLng | null>>
}) {
  useMapEvents({
    click: (e) => {
      if (markerType === 'destination')
        setDestination(e.latlng)
      else setLocation(e.latlng)
    }
  })

  return null
}

export const MapSGGW = ({ userLocation, markerType }: {
  userLocation: L.LatLng | null
  markerType: 'location' | 'destination'
}) => {
  const [location, setLocation] = useState<L.LatLng | null>(null)
  const [destination, setDestination] = useState<L.LatLng | null>(null)

  const sw = L.latLng(52.15656, 21.03624)
  const ne = L.latLng(52.16740, 21.05596)

  return (
    <MapContainer
      center={[52.16256, 21.04219]}
      maxBounds={L.latLngBounds(sw, ne)}
      zoom={16}
      minZoom={16}
      maxZoom={18}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {location && <Marker position={location}><Popup>Location</Popup></Marker>}
      {destination && <Marker position={destination}><Popup>Destination</Popup></Marker>}

      <OnMapClick markerType={markerType} setLocation={setLocation} setDestination={setDestination}/>
      <Routing location={userLocation} destination={destination}></Routing>

      {userLocation &&
        <Marker position={userLocation}>
          <Popup>
            Popup
          </Popup>
        </Marker>
      }
    </MapContainer>
  )
}

export default MapSGGW