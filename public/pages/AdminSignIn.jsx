import React, { useState } from 'react'
import AdminSignInComponent from '../components/AdminSignInComponent'
import OTPComponent from '../components/OTPComponent';
import logo from '../../src/assets/logo.png'

export default function AdminSignIn() {
  const [isProcessing, setIsProcessing] = useState();
  return (
    <div className="login-page">
      <div className="container">
        <div className="logo-box text-center">
          <img src={logo} className='img-fluid' alt="" />
        </div>
        {!isProcessing ?
          <AdminSignInComponent setIsProcessing={setIsProcessing} /> :
          <OTPComponent setIsProcessing={setIsProcessing} />
        }
      </div>
    </div>
  )
}
