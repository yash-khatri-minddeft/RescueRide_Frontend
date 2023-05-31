import { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminSignIn from '../public/pages/AdminSignIn';
import AdminDashBoard from '../public/pages/AdminDashBoard';
import Controller from '../public/pages/Controller';
import Hospital from '../public/pages/Hospital';
import Ambulance from '../public/pages/Ambulance';
import axios from 'axios';
import UpdateCTRLPass from '../public/pages/UpdateCTRLPass';
import ControllerDashboard from '../public/pages/ControllerDashboard';
import HomePage from '../public/pages/HomePage';
import BookAmbulance from '../public/pages/BookAmbulance';
import ControllerSignIn from '../public/pages/ControllerSignIn';
import BookingList from '../public/pages/BookingList';
import BookingDetailMap from '../public/components/BookingDetailMap';
import CurrentBookings from '../public/pages/CurrentBookings';
import Historybooking from '../public/pages/HistoryBookings';

function App() {
  const [userType, setUserType] = useState('guest');
  const checkLogin = async () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const isAdmin = axios.get('/api/admin/checkLogin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        if (!response.data.isAdmin) {
          return false;
        }
        setUserType('admin')
        return response.data.isAdmin;
      }).catch(err => {
        // if (err) {
        //   return false;
        //   console.log(err.response.data.message)
        // }
        return false;
      })
      return isAdmin;
    } else {
      return false;
    }
  }

  //check controller login

  const checkCTRLLogin = async () =>{
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const isController = await axios.get('/api/controller/check-login',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        if(!response.data.isController) {
          return false;
        }
        setUserType('controller')
        return response.data.isController;
      }).catch(err => {
        if (err.response && err.response.status === 404) {
          console.log(err.response.data.message)
        }
        return false;
      })
      return isController;
    } else {
      return false;
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage checkLogin={checkLogin} checkCTRLLogin={checkCTRLLogin} />} />
          <Route path='/admin-signin' element={<AdminSignIn checkLogin={checkLogin} />} />
          <Route path='/admin-dashboard' element={<AdminDashBoard checkLogin={checkLogin} />} />
          <Route path='/add-controller' element={<Controller checkLogin={checkLogin} />} />
          <Route path='/add-hospital' element={<Hospital checkLogin={checkLogin} />} />
          <Route path='/add-ambulance' element={<Ambulance checkLogin={checkLogin} />} />
          <Route path="/controller-signin" element={<ControllerSignIn checkCTRLLogin={checkCTRLLogin} />} />
          <Route path='/change-ctrl-pasword' element={<UpdateCTRLPass />} />
          <Route path='/controller-dashboard' element={<ControllerDashboard checkCTRLLogin={checkCTRLLogin} />} />
          <Route path='/book-ambulance' element={<BookAmbulance checkLogin={checkLogin} checkCTRLLogin={checkCTRLLogin} />} />
          <Route path='/booking-list' element={<BookingList checkLogin={checkLogin} checkCTRLLogin={checkCTRLLogin} />} />
          <Route path='/current-booking' element={<CurrentBookings checkLogin={checkLogin} checkCTRLLogin={checkCTRLLogin} />} />
          <Route path='/history-booking' element={<Historybooking checkLogin={checkLogin} checkCTRLLogin={checkCTRLLogin} />} />
          <Route path='/booking-list/:bookingId' element={<BookingDetailMap checkLogin={checkLogin} checkCTRLLogin={checkCTRLLogin} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
