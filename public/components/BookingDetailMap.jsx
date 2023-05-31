import React from 'react'
import { useParams } from 'react-router-dom'

export default function BookingDetailMap() {
  const {bookingId} = useParams();
  return (
    <div>{bookingId}</div>
  )
}
