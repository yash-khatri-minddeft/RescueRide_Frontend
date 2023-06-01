import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ControllerBookingRequest() {
  const { bookingId } = useParams();
  useEffect(() => {
    axios.post('/api/controller/get-booking-by-id', { id: bookingId })
      .then((response) => {
        console.log(response)
      })
  }, [])
  return (
    <div>ControllerBookingRequest</div>
  )
}
