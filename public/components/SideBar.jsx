import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function SideBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="sidebar">
      <ul className='list-unstyled'>
        <li>
          <NavLink to='/admin-dashboard'><i className="fa-solid fa-gauge"></i>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/add-controller'><i className="fa-solid fa-user-secret"></i>Controllers</NavLink>
        </li>
        <li>
          <NavLink to='/add-hospital' ><i className="fa-solid fa-house-medical"></i>Hospitals</NavLink>
        </li>
        <li>
          <NavLink to='/add-ambulance'><i className="fa-solid fa-truck-medical"></i>Ambulances</NavLink>
        </li>
        <li>
          <div className='logout' href='#' onClick={logOut}><i className="fa-solid fa-right-from-bracket"></i>Log Out</div>
        </li>
      </ul>
    </div>
  )
}
