import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import BookingMap from '../components/BookingMap';

export default function BookAmbulance() {
  const [longitude, setLongitude] = useState(50);
  const [latitude, setLatitude] = useState(50);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude)
        setLatitude(position.coords.latitude)
      }, (err) => {
        if (err.code === 1) {
          setErrorMessage('Please turn on location from settings or enter your location')
        }
      },{
        enableHighAccuracy: true,
      });
    } else {
      setErrorMessage("Geolocation is not supported by this browser please enter your location");
    }
  }, [])
  return (
    <div className="book-ambulance">
      <Header />
      {longitude && latitude && <BookingMap errorMessage={errorMessage} longitude={longitude} latitude={latitude} setLatitude={setLatitude} setLongitude={setLongitude} />}
    </div>
  )
}
