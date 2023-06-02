import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AmbulanceLocationComponent({ ambulanceId }) {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const ambulanceID = ambulanceId;
  const token = localStorage.getItem('token')
  useEffect(() => {
    const getLocation = () => {
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
    }
    setInterval(() => {
      console.log(latitude, longitude)
      getLocation()
    }, 2000)
    getLocation()
  }, [ambulanceId])

  return (
    <div className="admin-dashboard-inner">
      <div className="admin-dashboard-upper">
        <h2 className="dashboard-header">Update Location</h2>
      </div>
      <div className="location-detail">
        <span>Current location:</span>
        <h5>{latitude}, {longitude}</h5>
      </div>
    </div>
  )
}
