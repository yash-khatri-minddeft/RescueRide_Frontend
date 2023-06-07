import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import AmbulanceRouteComponent from '../components/AmbulanceRouteComponent';
import { io } from 'socket.io-client';
import axios from 'axios';
import L from 'leaflet';

const socket = io('https://api-rescueride.onrender.com/', {
  autoConnect: false
})

export default function AmbulanceRoute({ checkLogin }) {
  const navigate = useNavigate();
  const { ambulanceId } = useParams();
  const [ambulance, setAmbulance] = useState();
  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/admin-signin')
      }
    });
    axios.post('/api/controller/get-ambulance-by-id', { id: ambulanceId })
    .then((res) => {
      if(res.data.success) {
        setAmbulance(res.data.data)
      }
    })
  }, [])
  useEffect(() => {
    socket.connect();
    socket.emit('join', ambulanceId);
    socket.on('get_ambulance_router', data => {
      setAmbulance(data)
    })
  }, [socket])
  return (
    <div className='admin-dashboard'>
      <Header userType='admin' />
      <SideBar userType='admin' />
      <AmbulanceRouteComponent ambulance={ambulance} />
    </div>
  )
}
