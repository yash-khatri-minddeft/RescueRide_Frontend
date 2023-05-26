import React, { useEffect, useState } from 'react'
import logo from "../../src/assets/logo-main.png"
import axios from 'axios';
export default function Header() {
  const [username, setUsername] = useState();
  const token = localStorage.getItem('token')
  useEffect(() => {
    const getUserName = async () => {
      const response = await axios.get('/api/admin/getUserData',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(response.data.success) {
        setUsername(`Hello, ${response.data.data.name}`)
      }
    }
    if(token) {
      getUserName()
    } else {
      setUsername('Hello, Guest!')
    }
  },[])
  return (
    <div className="header">
        <div className="header-inner">
          <div className="logo-left">
            <img src={logo} className="img-fluid" alt="" />
          </div>
          <ul className='list-unstyled'></ul>
          <div className="admin-details">
            <div className="span">{username}</div>
          </div>
        </div>
    </div>
  )
}
