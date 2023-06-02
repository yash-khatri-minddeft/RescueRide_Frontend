import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function SideBar({ userType }) {
  const adminSidebar = [
    { text: 'Dashboard', link: '/admin-dashboard', icon: 'fa-solid fa-gauge' },
    { text: 'Controllers', link: '/add-controller', icon: 'fa-solid fa-user-secret' },
    { text: 'Hospitals', link: '/add-hospital', icon: 'fa-solid fa-house-medical' },
    { text: 'Ambulances', link: '/add-ambulance', icon: 'fa-solid fa-truck-medical' },
  ]
  const controllerSidebar = [
    { text: 'Dashboard', link: '/controller-dashboard', icon: 'fa-solid fa-gauge' },
    { text: 'Manage Ambulance', link: '/', icon: 'fa-solid fa-truck-medical' },
  ];
  const driverSidebar = [
    { text: 'Dashboard', link: '/driver-dashboard', icon: 'fa-solid fa-gauge' },
    { text: 'Location', link: '/ambulance-location', icon: 'fa-solid fa-location-dot' },
  ];
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  const [sidebarNav, setSidebarNav] = useState();
  useEffect(() => {
    if (userType == 'admin') {
      setSidebarNav(adminSidebar);
    } else if (userType == 'controller') {
      setSidebarNav(controllerSidebar)
    } else if (userType == 'driver') {
      setSidebarNav(driverSidebar)
    }
  }, [userType])
  return (
    <div className="sidebar">
      <ul className='list-unstyled'>
        {sidebarNav?.map((nav, key) => {
          return (
            <li key={key}>
              <NavLink to={nav.link}><i className={nav.icon}></i>{nav.text}</NavLink>
            </li>
          )
        })}
        <li>
          <div className='logout' href='#' onClick={logOut}><i className="fa-solid fa-right-from-bracket"></i>Log Out</div>
        </li>
      </ul>
    </div>
  )
}
