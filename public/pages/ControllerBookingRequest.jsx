import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header';
import ControllerBookingRequestMap from '../components/ControllerBookingRequestMap';
import SideBar from '../components/SideBar';

export default function ControllerBookingRequest({ checkCTRLLogin }) {
  const navigate = useNavigate();
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
    checkCTRLLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/controller-signin')
      }
    });
  }, [])
  return (
    <>
      <Header userType='controller' />
      <SideBar userType='controller' />
      {booking?.status == 'pending' ? <ControllerBookingRequestMap bookingId={bookingId} position={position} booking={booking} /> : <div className='admin-dashboard-inner'><h2>Booking already done</h2></div>}
    </>
  )
}
