import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminSignIn from '../public/pages/AdminSignIn';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin-signin' element={<AdminSignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
