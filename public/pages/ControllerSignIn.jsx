import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import OTPComponent from '../components/OTPComponent'
import logo from '../../src/assets/logo.png'
import AdminSignInComponent from '../components/AdminSignInComponent'
import { useNavigate } from 'react-router-dom';
import ControllerSignInComponent from '../components/ControllerSignInComponent'

export default function ControllerSignIn({checkCTRLLogin}) {
  const [isProcessing, setIsProcessing] = useState();
  const [maskedEmail, setMaskedEmail] = useState();
  const [isLoading, setIsLoading] = useState();
  const [toastText, setToastText] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  useEffect(() => {
    if (toastText.type == 'success') {
      toast.success(toastText.text)
    } else if (toastText.type == 'error') {
      toast.error(toastText.text)
    }

    checkCTRLLogin().then((isLoggedIn) => {
      console.log(isLoggedIn)
      if (isLoggedIn) {
        navigate('/controller-dashboard')
      }
    });
  }, [toastText])
  return (
    <div className="login-page">
      <div className="container">
        <div className="logo-box text-center">
          <img src={logo} className='img-fluid' alt="" />
        </div>
        {!isProcessing ?
          <ControllerSignInComponent setIsProcessing={setIsProcessing} setToastText={setToastText} setMaskedEmail={setMaskedEmail} isLoading={isLoading} setIsLoading={setIsLoading} /> :
          <OTPComponent setIsProcessing={setIsProcessing} maskedEmail={maskedEmail} userType='controller' />
        }
        <ToastContainer />
      </div>
    </div>
  )
}
