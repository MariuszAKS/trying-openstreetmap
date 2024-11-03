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

function OnMapClick({ destination, setDestination}: {
  destination: L.LatLng | null
  setDestination: React.Dispatch<React.SetStateAction<L.LatLng | null>>
}) {
  useMapEvents({
    click: (e) => {
      setDestination(e.latlng)
    }
  })

  return (
    <>
      {destination !== null &&
        <Marker position={[destination.lat, destination.lng]}></Marker>
      }
    </>
  )
}

export const MapSGGW = ({ userLocation }: {
  userLocation: L.LatLng | null
}) => {
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
      {userLocation &&
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>
            Popup
          </Popup>
        </Marker>
      }
      <OnMapClick destination={destination} setDestination={setDestination}/>
      <Routing location={userLocation} destination={destination}></Routing>
    </MapContainer>
  )
}

export default MapSGGW