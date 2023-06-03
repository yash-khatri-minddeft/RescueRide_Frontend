import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import BookingDetailMapComponent from '../components/BookingDetailMapComponent';

export default function BookingDetailMap({ checkLogin, checkCTRLLogin, checkDRIVERLogin }) {
  const { bookingId } = useParams();
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
  return (
    <>
      <Header userType={userType} />
      <BookingDetailMapComponent bookingId={bookingId} />
    </>
  )
}
