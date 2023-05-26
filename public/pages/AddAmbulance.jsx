import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AddAmbulanceComponent from '../components/AddAmbulanceComponent'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default function AddAmbulance() {
  useEffect(() => {
    const checkLoggedIn = async() => {

      // const response = await axios.get('/check-loggedin',{headers: {
      //   'Authorization' : 'JWT {token}'
      // }});
      // if(!response.data.isLoggedin) {
      //   Navigate('/login')
      // }
    }
    if(localStorage.getItem('token')) {
      checkLoggedIn()
    }
    console.log(localStorage.getItem('token'))
  })
  return (
    <>
      <div className="admin-dashboard">
        <Header />
        <SideBar />
        <AddAmbulanceComponent />
      </div>
    </>
  )
}
