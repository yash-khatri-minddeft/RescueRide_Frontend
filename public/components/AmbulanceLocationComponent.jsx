import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socket = io('https://api-rescueride.onrender.com:8080', {
  autoConnect: false
})

export default function AmbulanceLocationComponent({ ambulanceId }) {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const token = localStorage.getItem('token')
  useEffect(() => {
    socket.connect();
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.latitude, position.coords.longitude)
          const newPosition = {
            id: ambulanceId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          setLatitude(newPosition.latitude)
          setLongitude(newPosition.longitude)
          socket.emit('update_location', newPosition)
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
    if (ambulanceId) {
      setInterval(() => {
        getLocation()
      }, 5000)
      getLocation()
    }
  }, [socket, ambulanceId])

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
