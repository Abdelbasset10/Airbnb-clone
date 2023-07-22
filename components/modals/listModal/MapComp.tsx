'use client'
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

interface Props {
  lat:string,
  long:string
}

const MapComp = ({lat,long} : Props) => {
  return (
    <MapContainer center={[Number(lat),Number(long)]} zoom={4} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
  <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
      <Marker 
        position={[Number(lat),Number(long)]}
        draggable={true}
      >
      </Marker>
    </MapContainer>
  )
}

export default MapComp