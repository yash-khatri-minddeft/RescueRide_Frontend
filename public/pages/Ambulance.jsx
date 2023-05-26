import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AmbulanceComponent from '../components/AmbulanceComponent'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Ambulance({checkLogin}) {
  const navigate = useNavigate();
  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/')
      }
    });
  }, [])
  return (
    <>
      <div className="admin-dashboard">
        <Header />
        <SideBar />
        <AmbulanceComponent />
      </div>
    </>
  )
}
