import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className="sidebar">
      <ul className='list-unstyled'>
        <li>
          <NavLink to='/admin-dashboard'><i className="fa-solid fa-gauge"></i>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/add-controller'><i className="fa-solid fa-user-secret"></i>Add Controller</NavLink>
        </li>
        <li>
          <NavLink to='/add-hospital' ><i className="fa-solid fa-house-medical"></i>Add Hospital</NavLink>
        </li>
        <li>
          <NavLink to='/add-ambulance'><i className="fa-solid fa-truck-medical"></i>Add Ambulance</NavLink>
        </li>
      </ul>
    </div>
  )
}
