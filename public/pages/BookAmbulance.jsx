import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import BookingMap from '../components/BookingMap';
import { ToastContainer } from 'react-toastify';

export default function BookAmbulance({ checkLogin, checkCTRLLogin, checkDRIVERLogin }) {
  const [longitude, setLongitude] = useState(50);
  const [latitude, setLatitude] = useState(50);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userType, setUserType] = useState();
  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (isLoggedIn) {
        setUserType('admin')
      }
    });
    checkCTRLLogin().then((isLoggedIn) => {
      if (isLoggedIn) {
        setUserType('controller')
      }
    });
    checkDRIVERLogin().then((isLoggedIn) => {
      if (isLoggedIn) {
        setUserType('driver')
      }
    })
  }, [])
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude)
        setLatitude(position.coords.latitude)
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
    <div className="book-ambulance">
      <Header userType={userType} />
      {longitude && latitude && <BookingMap errorMessage={errorMessage} longitude={longitude} latitude={latitude} setLatitude={setLatitude} setLongitude={setLongitude} />}
    </div>
  )
}
