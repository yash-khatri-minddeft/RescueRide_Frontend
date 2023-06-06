import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client';
import Loader from '../components/Loader';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import AmbulanceLocationComponent from '../components/AmbulanceLocationComponent';
import axios from 'axios';

const socket = io('https://api-rescueride.onrender.com/', {
  autoConnect: false
})

export default function AmbulanceLocation({ checkDRIVERLogin }) {
  const navigate = useNavigate();
  const [ambulanceId, setAmbulanceId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token')
  useEffect(() => {
    checkDRIVERLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/driver-signin')
      }
    })
    axios.get(`/api/driver/getUserData`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.data.success) {
        setAmbulanceId(response.data.data._id)
      }
    })
  }, [])
  return (
    <div className='driver-dashboard'>
      {isLoading && <Loader />}
      <Header userType='driver' />
      <SideBar userType='driver' />
      <AmbulanceLocationComponent ambulanceId={ambulanceId} />
    </div>
  )
}
