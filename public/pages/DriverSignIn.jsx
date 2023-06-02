import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import OTPComponent from '../components/OTPComponent';
import logo from '../../src/assets/logo.png'
import DriverSignInComponent from '../components/DriverSignInComponent'


export default function DriverSignIn({checkDRIVERLogin}) {
    const [isProcessing,setIsProcessing] = useState();
    const [maskedEmail,setMaskedEmail] = useState();
    const [isLoading,setIsLoading] = useState();
    const [toastText,setToastText] = useState({text:'',type:''});
    const navigate = useNavigate();
    useEffect(() => {
        if (toastText.type == 'success') {
            toast.success(toastText.text)
        }else if(toastText.type == 'error') {
            toast.error(toastText.text)
        }
    },[toastText])
    useEffect(() => {
        checkDRIVERLogin().then((isLoggedIn) => {
            if (isLoggedIn) {
                navigate('/driver-dashboard')
            }
        })
    },[])
    return(
        <div className='login-page'>
            <div className='container'>
                <div className='logo-box text-center'>
                    <img src={logo} className='img-fluid' alt=''/>
                </div>
                {!isProcessing ? 
                <DriverSignInComponent setIsProcessing={setIsProcessing} setToastText={setToastText}
                setMaskedEmail = {setMaskedEmail} isLoading = {isLoading} setIsLoading = {setIsLoading}/> :
                <OTPComponent setIsProcessing={setIsProcessing} maskedEmail={maskedEmail}
                userType='driver'/>
                }
                <ToastContainer/>
            </div>
        </div>
    )
}