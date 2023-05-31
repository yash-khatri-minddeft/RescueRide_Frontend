import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ClientBookingList({ id, hospitalName, status }) {

  return (
    <>
      <tr>
        <td><Link to={`/booking-list/${id}`}>{id}</Link></td>
        <td>{hospitalName}</td>
        <td><span>{status}</span></td>
      </tr>
    </>
  )
}
