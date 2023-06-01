import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ControllerBookingList({ bookings }) {
  return (
    <div className="admin-dashboard-inner">
      <div className="admin-dashboard-upper">
        <h2 className='dashboard-header'>Booking Requests</h2>
      </div>
      <div className="table-responsive">

        {bookings?.length ?
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Hospital Name</th>
                <th>Action</th>
              </tr>
              {/* {console.log(hospitalName)} */}
            </thead>
            <tbody>
              {bookings?.map((booking, key) => {
                return (
                  <tr key={key}>
                    <td>{booking.booking.username}</td>
                    <td><a href={`tel:${booking.booking.number}`}>{booking.booking.number}</a></td>
                    <td>{booking.hospital.address}</td>
                    <td><Link className='button' to={`/booking-request/${booking.booking._id}`}><i className="fa-solid fa-arrow-up-right-from-square"></i></Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          : <>No Bookings </>}
      </div>
    </div>
  )
}
