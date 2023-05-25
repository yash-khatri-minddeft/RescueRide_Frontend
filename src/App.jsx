import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from '../public/pages/AdminLogin';

function App() {

  useEffect(() => {
    fetch('/api/admin/admin-signup', {
      method: "POST"
    }).then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin-signup' element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
