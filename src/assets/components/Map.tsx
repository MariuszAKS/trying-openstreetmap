import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

export const Map = () => {
  return (
    <MapContainer center={[50, 50]} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[52.24, 21.01]}>
        <Popup>
          Popup
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map