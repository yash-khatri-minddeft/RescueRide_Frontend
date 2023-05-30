import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function OTPComponent({setIsProcessing, maskedEmail, userType}) {
  const otp = useRef();
	const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('/api/admin/admin-otp', {
			otp: otp.current.value,
		})
		if(response.data.success) {
			localStorage.setItem('token',response.data.token)
			navigate(`/${userType}-dashboard`)
		} else {
      alert(response.data.message)
    }
  }
  const BackToLogin = () => {
    setIsProcessing(false)
  }
  return (
    <div className="login-box">
			<form onSubmit={handleSubmit}>
				<h2 className="login-title">Enter OTP</h2>
				<p>{maskedEmail} </p>
				<div className="login-input-container">
					<div className="input-box">
						<label htmlFor="OTP">OTP: <span>*</span></label>
						<input type="password" id='OTP' ref={otp} />
					</div>
					<div className="input-box" style={{ marginTop: "15px" }}>
						<button type='submit'>Sign In</button>
					</div>
					<div className="input-box">
						<button type='button' onClick={BackToLogin}>Go back to Login page</button>
					</div>
				</div>
			</form>
		</div>
  )
}