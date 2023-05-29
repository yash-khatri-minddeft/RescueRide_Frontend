import React, { useEffect, useState } from 'react'
import logo from "../../src/assets/logo-main.png"
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Header() {
  const [username, setUsername] = useState();
  const token = localStorage.getItem('token');
  const [listItems, setListItems] = useState([{ text: 'Book Ambulance', link: '/book-ambulance' }]);
  useEffect(() => {
    const getUserName = async () => {
      const response = await axios.get('/api/admin/getUserData', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.success) {
        setUsername(`Hello, ${response.data.data.name}`)
      }
    }
    if (token) {
      getUserName()
    } else {
      setUsername('Hello, Guest!')
    }
  }, [])
  return (
    <div className="header">
      <div className="header-inner">
        <div className="logo-left">
          <img src={logo} className="img-fluid" alt="" />
        </div>
        {listItems &&
          <ul className='list-unstyled ms-5'>
            {listItems?.map((list, key) => {
              return (
                <li key={key}><Link to={list.link}>{list.text}</Link></li>
              )
            })}
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
