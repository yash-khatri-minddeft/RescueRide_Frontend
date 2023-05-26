import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import HospitalComponent from '../components/HospitalComponent'
import { useNavigate } from 'react-router-dom';

export default function Hospital({checkLogin}) {
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
        <HospitalComponent />
      </div>
    </>
  )
}
