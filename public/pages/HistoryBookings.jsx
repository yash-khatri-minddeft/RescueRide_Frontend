import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ClientBookingList from '../components/ClientBookingList';
import Loader from '../components/Loader';
import axios from 'axios';

export default function Historybooking({ checkLogin, checkCTRLLogin, checkDRIVERLogin }) {
  const [userType, setUserType] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  const localBooking = JSON.parse(localStorage.getItem('bookingID')) || [];
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (localBooking.length) {
      localBooking.map((id) => {
        axios.post('api/controller/get-pending-booking', { id: id, status: 'completed' })
          .then(booking => {
            if (booking.data.data != null) {
              axios.post('api/controller/get-hospital-by-id', { id: booking.data.data.hospitalid })
                .then(hospital => {
                  if (hospital.data.success) {
                    setBookings((bookings) => [...bookings, { booking: booking.data.data, hospital: hospital.data.data }])
                    // setHospitalName((hospitalName) => [...hospitalName, response.data.data.address])
                    setIsLoading(false)
                  }
                })
            } else {
              setIsLoading(false)
            }
          })
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      {isLoading && <Loader opacity={1} />}
      <Header userType={userType} />
      <div className="booking-list">
        <div className="container">
          <p>if you can't see your bookings, please check your mail for the booking details link or, open the website from the same browser you booked the ambulance.</p>
          <div className="table-responsive">
            {bookings?.length ?
              <table className='table'>
                <thead>
                  <tr>
                    <th>Booking Id</th>
                    <th>Hospital Name</th>
                    <th>Booking Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking, key) => {
                    return (<ClientBookingList key={key} hospitalName={booking.hospital.address} id={booking.booking._id} status={booking.booking.status} />)
                  })}
                </tbody>
              </table> :
              <p>No Bookings found!</p>
            }
          </div>
        </div>
      </div >
    </>
  )
}
