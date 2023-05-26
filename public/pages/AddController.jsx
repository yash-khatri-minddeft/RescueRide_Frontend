import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AddControllerComponent from '../components/AddControllerComponent'

export default function AddController() {
  return (
    <>
      <div className="admin-dashboard">
        <Header />
        <SideBar />
        <AddControllerComponent />
      </div>
    </>
  )
}
