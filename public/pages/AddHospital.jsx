import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AddHospitalComponent from '../components/AddHospitalComponent'
export default function AddHospital() {
  return (
    <>
      <div className="admin-dashboard">
        <Header />
        <SideBar />
        <AddHospitalComponent />
      </div>
    </>
  )
}
