import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import ControllerBookingRequestMap from '../components/ControllerBookingRequestMap';
import SideBar from '../components/SideBar';

export default function ControllerBookingRequest({ checkLogin, checkCTRLLogin }) {
  const { bookingId } = useParams();
  const [userType, setUserType] = useState();
  const [position, setPosition] = useState({latitude: '', longitude: ''});
  const [booking, setBooking] = useState();
  useEffect(() => {
    axios.post('/api/controller/get-booking-by-id', { id: bookingId })
      .then((response) => {
        if(response.data.success) {
          setPosition({latitude:response.data.data.user_latitude, longitude: response.data.data.user_longitude})
          setBooking(response.data.data)
        }
        console.log(response)
      })
  }, [])
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
  }, [])
  return (
    <>
      <Header userType={userType} />
      <SideBar userType={userType} />
      <ControllerBookingRequestMap position={position} booking={booking} />
    </>
  )
}
