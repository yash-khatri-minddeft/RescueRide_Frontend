import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import ControllerBookingRequestMap from '../components/ControllerBookingRequestMap';
import SideBar from '../components/SideBar';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080', {
  autoConnect: false
})

export default function ControllerBookingRequest({ checkLogin, checkCTRLLogin, checkDRIVERLogin }) {
  const { bookingId } = useParams();
  const [userType, setUserType] = useState();
  const [position, setPosition] = useState({ latitude: '', longitude: '' });
  const [booking, setBooking] = useState();
  useEffect(() => {
    axios.post('/api/controller/get-booking-by-id', { id: bookingId })
      .then((response) => {
        if (response.data.success) {
          setPosition({ latitude: response.data.data.user_latitude, longitude: response.data.data.user_longitude })
          setBooking(response.data.data)
        }
      })
  }, [])
  useEffect(() => {
    // socket.connect();
    // socket.emit('join', bookingId)
    // socket.on('get_location', data => {
    //   console.log('data', data)
    //   // setPosition({ latitude: response.data.data.user_latitude, longitude: response.data.data.user_longitude })
    // })
    // return () => {
    //   socket.off('get_location')
    // }
  }, [socket])
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
  return (
    <>
      <Header userType={userType} />
      <SideBar userType={userType} />
      {booking?.status == 'pending' ? <ControllerBookingRequestMap bookingId={bookingId} position={position} booking={booking} /> : <div className='admin-dashboard-inner'><h2>Booking already done</h2></div>}
    </>
  )
}
