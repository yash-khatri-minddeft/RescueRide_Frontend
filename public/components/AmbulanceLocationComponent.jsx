import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socket = io('https://api-rescueride.onrender.com/', {
  autoConnect: false
})

export default function AmbulanceLocationComponent({ ambulanceId }) {
  var lastLatitude = localStorage.getItem('lastLatitude'), lastLongitude = localStorage.getItem('lastLongitude');
  const [latitude, setLatitude] = useState(lastLatitude);
  const [longitude, setLongitude] = useState(lastLongitude);
  const token = localStorage.getItem('token');
  useEffect(() => {
    socket.connect();
    const getLocation = () => {
      lastLatitude = localStorage.getItem('lastLatitude'), lastLongitude = localStorage.getItem('lastLongitude');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const newPosition = {
            id: ambulanceId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          if(lastLatitude != position.coords.latitude || lastLongitude != position.coords.longitude) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude);
            localStorage.setItem('lastLatitude', position.coords.latitude)
            localStorage.setItem('lastLongitude', position.coords.longitude)
            socket.emit('update_location', newPosition)
          }
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
      console.log(ambulanceId)
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
