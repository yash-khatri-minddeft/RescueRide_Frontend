import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AdminDashBoardComponent from '../components/AdminDashBoardComponent'

export default function AdminDashBoard() {
  return (
    <>
      <div className="admin-dashboard">
        <Header />
        <SideBar />
        <AdminDashBoardComponent />
      </div>
    </>
  )
}
