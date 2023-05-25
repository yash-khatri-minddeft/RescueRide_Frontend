import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from '../public/pages/AdminLogin';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/admin-login'} element={<AdminLogin />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
