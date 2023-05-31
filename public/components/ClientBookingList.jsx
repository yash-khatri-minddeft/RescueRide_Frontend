import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ClientBookingList({id}) {
  useEffect(() => {
    
  },[])
  return (
    <>
      <li><Link to={`/booking-list/${id}`}>{id}</Link></li>
    </>
  )
}
