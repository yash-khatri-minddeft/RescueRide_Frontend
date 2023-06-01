import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar';
import axios from 'axios';
import ControllerBookingList from '../components/ControllerBookingList';

export default function ControllerDashboard({ checkCTRLLogin }) {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    checkCTRLLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/')
      }
    });
  }, [])
  useEffect(() => {

    axios.get('/api/controller/get-all-pending-bookings')
      .then(async (response) => {
        // setBookings(response.data.data)
        return Promise.all(response.data.data.map(async (booking) => {
          console.log(booking)
          return axios.post('/api/controller/get-hospital-by-id', { id: booking.hospitalid })
            .then((hospital) => {
              return setBookings((bookings) => [...bookings, { booking: booking, hospital: hospital.data.data }])
            })
        }));
      })
  }, [])
  return (
    <div className="controller-dashboard">
      <Header userType="controller" />
      <SideBar userType="controller" />
      <ControllerBookingList bookings={bookings} />
    </div>
  )
}
