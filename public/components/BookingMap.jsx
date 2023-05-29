import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from '@christopherpickering/react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import '@christopherpickering/react-leaflet-markercluster/dist/styles.min.css';
import icon from './../../src/assets/images/hospital-icon.png'
import mapIcon from './../../src/assets/images/map-marker.png'
import { Icon } from 'leaflet';
import axios from 'axios';
import LeafletControlGeocoder from './LeafletControlGeocoder';

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    console.log()
    map.setView([lat, lng], map.getZoom(), {
      animate: true
    });
  }, [lat, lng]);
  return null;
}


export default function BookingMap({ longitude, latitude, setLatitude, setLongitude }) {
  const [hospitals, setHospitals] = useState();
  const locationName = useRef();
  const [isInputAdded, setIsInputAdded] = useState(true);

  const handleLocationSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.get({
      url: `https://us1.locationiq.com/v1/search?key=pk.ff061be4c32394e02aa7d0e9c0c86a30&q=${locationName.current.value}&format=json`,
    })
    console.log(response)
  }


  useEffect(() => {
    axios.get('/api/controller/admin-gethospital')
      .then(response => {
        setHospitals(response.data.data)
        console.log(response.data.data)
      })
  }, [])

  const ambulanceIcon = new Icon({
    iconUrl: icon,
    iconSize: [40, 40]
  })
  const mapMarker = new Icon({
    iconUrl: mapIcon,
    iconSize: [30, 50]
  })
  const position = [latitude, longitude]
  return (
    <div className="booking-map">
      <MapContainer
        className="markercluster-map"
        center={position}
        zoom={15}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {isInputAdded && <LeafletControlGeocoder setLatitude={setLatitude} setLongitude={setLongitude} />}
        <Marker position={position} icon={mapMarker} />
        <RecenterAutomatically lat={latitude} lng={longitude} />
        <MarkerClusterGroup>
          {hospitals?.map((hospital, key) => {
            return (
              <Marker key={key} position={[hospital.latitude, hospital.longitude]} icon={ambulanceIcon}>
                <Popup>
                  <h4>{hospital.name}</h4>
                  <button className=''>Book</button>
                </Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}
