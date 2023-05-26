import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminSignIn from '../public/pages/AdminSignIn';
import AdminDashBoard from '../public/pages/AdminDashBoard';
import AddController from '../public/pages/AddController';
import AddHospital from '../public/pages/AddHospital';
import AddAmbulance from '../public/pages/AddAmbulance';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/admin-signin' />} />
          <Route path='/admin-signin' element={<AdminSignIn />} />
          <Route path='/admin-dashboard' element={<AdminDashBoard />} />
          <Route path='/add-controller' element={<AddController />} />
          <Route path='/add-hospital' element={<AddHospital />} />
          <Route path='/add-ambulance' element={<AddAmbulance />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
