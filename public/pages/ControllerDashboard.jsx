import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar';
import axios from 'axios';
import ControllerBookingList from '../components/ControllerBookingList';
import Loader from '../components/Loader';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080', {
  autoConnect: false
})

export default function ControllerDashboard({ checkCTRLLogin }) {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    checkCTRLLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/controller-signin')
      }
    });
  }, [])
  useEffect(() => {
    axios.get('/api/controller/get-all-pending-bookings')
      .then(async (response) => {
        console.log(response)
        if (response.data.data.length) {
          return Promise.all(response.data.data.map(async (booking) => {
            return axios.post('/api/controller/get-hospital-by-id', { id: booking.hospitalid })
              .then((hospital) => {
                setIsLoading(false)
                return setBookings((bookings) => [...bookings, { booking: booking, hospital: hospital.data.data }])
              })
          }));
        } else {
          setIsLoading(false)
        }
      })
  }, [])
  useEffect(() => {
    socket.connect();
    socket.on('new_booking', (data) => {
      console.log(data)
      axios.post('/api/controller/get-hospital-by-id', { id: data.hospitalid })
        .then((hospital) => {
          setIsLoading(false)
          return setBookings((bookings) => [{ booking: data, hospital: hospital.data.data }, ...bookings])
        })
    })
    return () => {
      socket.off('new_booking')
    }
  }, [socket])
  return (
    <div className="controller-dashboard">
      {isLoading && <Loader />}
      <Header userType="controller" />
      <SideBar userType="controller" />
      <ControllerBookingList bookings={bookings} />
    </div>
  )
}
