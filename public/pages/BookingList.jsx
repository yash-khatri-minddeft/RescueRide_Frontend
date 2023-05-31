import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ClientBookingList from '../components/ClientBookingList';

export default function BookingList({ checkLogin, checkCTRLLogin }) {
  const [userType, setUserType] = useState();
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

  const localBooking = JSON.parse(localStorage.getItem('bookingID')) || [];
  const [bookingIds, setBookingIds] = useState(localBooking);
  return (
    <>
      <Header userType={userType} />
      <div className="booking-list">
        <div className="container">
          <ul className="list-unstyled">

            {bookingIds.length ?
              bookingIds.map((id, key) => {
                return (<ClientBookingList key={key} id={id} />)
              }) :
              <>No Bookings found</>
            }
          </ul>
        </div>
      </div>
    </>
  )
}
