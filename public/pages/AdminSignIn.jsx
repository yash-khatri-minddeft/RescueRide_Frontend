import React, { useEffect, useState } from 'react'
import AdminSignInComponent from '../components/AdminSignInComponent'
import OTPComponent from '../components/OTPComponent';
import logo from '../../src/assets/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminSignIn() {
  const [isProcessing, setIsProcessing] = useState();
  const [maskedEmail, setMaskedEmail] = useState();
  const [isLoading, setIsLoading] = useState();
  const [toastText, setToastText] = useState({text: '', type: ''});
  useEffect(() => {
    if(toastText.type == 'success') {
      toast.success(toastText.text)
    } else if(toastText.type == 'error') {
      toast.error(toastText.text)
    }
  },[toastText])
  return (
    <div className="login-page">
      <div className="container">
        <div className="logo-box text-center">
          <img src={logo} className='img-fluid' alt="" />
        </div>
        {!isProcessing ?
          <AdminSignInComponent setIsProcessing={setIsProcessing} setToastText={setToastText} setMaskedEmail={setMaskedEmail} isLoading={isLoading} setIsLoading={setIsLoading} /> :
          <OTPComponent setIsProcessing={setIsProcessing} maskedEmail={maskedEmail} />
        }
        <ToastContainer />
      </div>
    </div>
  )
}
