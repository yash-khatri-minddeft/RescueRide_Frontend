import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AdminDashBoardComponent from '../components/AdminDashBoardComponent'
import { Route, Routes, useNavigate } from 'react-router-dom'

export default function AdminDashBoard({ checkLogin }) {
  const navigate = useNavigate();
  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/admin-signin')
      }
    });
  }, [])
  return (
    <>
      <div className="admin-dashboard">
        <Header userType='admin' />
        <SideBar userType='admin' />
        <AdminDashBoardComponent />
      </div>
    </>
  )
}
