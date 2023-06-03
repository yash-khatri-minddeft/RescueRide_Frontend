import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import icon from './../../src/assets/images/hospital-icon.png'
import ambIcon from './../../src/assets/images/ambulance-icon.png'
import mapIcon from './../../src/assets/images/map-marker.png';
import BookingDetailCurrentLocationRouter from './BookingDetailCurrentLocationRouter'
import { Icon } from 'leaflet';

export default function BookingDetailCurrentLocation({ bookingDetails, hospitalDetails, userCoords, ambulanceCoords, hospitalCoords }) {
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
      {userCoords && hospitalCoords && <BookingDetailCurrentLocationRouter userCoords={{ latitude: userCoords.latitude, longitude: userCoords.longitude }} hospitalCoords={hospitalCoords} />}
      <Marker position={[userCoords.latitude, userCoords.longitude]} icon={mapMarker}>
        <Popup>
          <h6 style={{ fontWeight: "600" }}>Your Location</h6>
          {userCoords.latitude}, {userCoords.longitude}
        </Popup>
      </Marker>
      <Marker position={[hospitalCoords.latitude, hospitalCoords.longitude]} icon={hospitalIcon}>
        <Popup>
          <h6 style={{ fontWeight: "600" }}>{hospitalDetails.address}</h6>
          {hospitalDetails.latitude}, {hospitalDetails.longitude}
        </Popup>
      </Marker>
      {bookingDetails.status == 'current' && <Marker position={[ambulanceCoords.latitude, ambulanceCoords.longitude]} icon={ambulanceIcon}></Marker>}
    </MapContainer>
  )
}
