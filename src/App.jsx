import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AdminSignIn from '../public/pages/AdminSignIn';
import AdminDashBoard from '../public/pages/AdminDashBoard';
import Controller from '../public/pages/Controller';
import Hospital from '../public/pages/Hospital';
import Ambulance from '../public/pages/Ambulance';
import axios from 'axios';
import UpdateCTRLPass from '../public/pages/UpdateCTRLPass';
import ControllerDashboard from '../public/pages/ControllerDashboard';

function App() {
  const checkLogin = async () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/checkLogin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(!response.data.isLoggedIn) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/admin-signin' />} />
          <Route path='/admin-signin' element={<AdminSignIn checkLogin={checkLogin} />} />
          <Route path='/admin-dashboard' element={<AdminDashBoard checkLogin={checkLogin} />} />
          <Route path='/add-controller' element={<Controller checkLogin={checkLogin} />} />
          <Route path='/add-hospital' element={<Hospital checkLogin={checkLogin} />} />
          <Route path='/add-ambulance' element={<Ambulance checkLogin={checkLogin} />} />
          <Route path='/change-ctrl-pasword' element={<UpdateCTRLPass />} />
          <Route path='/controller-dashboard' element={<ControllerDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
