import React, { useEffect, useState } from 'react'
import logo from "../../src/assets/logo-main.png"
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
export default function Header({ userType = 'guest' }) {
  const [username, setUsername] = useState();
  const token = localStorage.getItem('token');

  const listItems = [
    { text: 'Home', link: '/' },
    { text: 'Book Ambulance', link: '/book-ambulance' },
    { text: 'Pending Booking', link: '/booking-list' },
    { text: 'Current Booking', link: '/current-booking' },
    { text: 'History', link: '/history-booking' }
  ];

  useEffect(() => {
    const getUserName = async () => {
      const response = await axios.get(`/api/${userType}/getUserData`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.success) {
        if(response.data.data.driverName) {
          setUsername(`Hello, ${response.data.data.driverName}`)
        } else {
          setUsername(`Hello, ${response.data.data.name}`)
        }
      }
    }
    if (token && userType !== 'guest') {
      getUserName()
    } else {
      setUsername('Hello, Guest!')
    }
  }, [userType])
  return (
    <div className="header">
      <div className="header-inner">
        <div className="logo-left">
          <Link to='/'><img src={logo} className="img-fluid" alt="" /></Link>
        </div>
        {listItems &&
          <ul className='list-unstyled header-nav ms-5'>
            {listItems?.map((list, key) => {
              return (
                <li key={key}><NavLink to={list.link}>{list.text}</NavLink></li>
              )
            })}
            {userType == 'controller' && <Link to='/controller-dashboard'>Dashboard</Link>}
            {userType == 'admin' && <Link to='/admin-dashboard'>Dashboard</Link>}
          </ul>
        }
        <ul className='list-unstyled'></ul>
        <div className="admin-details ms-auto">
          <div className="span">{username}</div>
        </div>
      </div>
    </div>
  )
}
