import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import icon from './../../src/assets/images/hospital-icon.png'
import ambIcon from './../../src/assets/images/ambulance-icon.png'
import mapIcon from './../../src/assets/images/map-marker.png';
import BookingDetailCurrentLocationRouter from './BookingDetailCurrentLocationRouter'
import { Icon } from 'leaflet';

export default function BookingDetailCurrentLocation({ userCoords, ambulanceCoords, hospitalCoords }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const mapMarker = new Icon({
    iconUrl: mapIcon,
    iconSize: [30, 50]
  })
  const hospitalIcon = new Icon({
    iconUrl: icon,
    iconSize: [45, 50]
  })
  const ambulanceIcon = new Icon({
    iconUrl: ambIcon,
    iconSize: [25, 40]
  })
  useEffect(() => {
    console.log('hi')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }, (err) => {
        if (err.code === 1) {
          setErrorMessage('Please turn on location from settings or enter your location')
        }
      }, {
        enableHighAccuracy: true,
      });
    } else {
      setErrorMessage("Geolocation is not supported by this browser please enter your location");
    }
  }, [])

  return (
    <MapContainer>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {userCoords && hospitalCoords && <BookingDetailCurrentLocationRouter userCoords={{latitude: latitude, longitude: longitude}} hospitalCoords={hospitalCoords} />}
      <Marker position={[latitude, longitude]} icon={mapMarker}></Marker>
      <Marker position={[ambulanceCoords.latitude, ambulanceCoords.longitude]} icon={ambulanceIcon}></Marker>
      <Marker position={[hospitalCoords.latitude, hospitalCoords.longitude]} icon={hospitalIcon}></Marker>
    </MapContainer>
  )
}
