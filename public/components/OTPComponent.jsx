import axios from 'axios';
import React, { useRef } from 'react'

export default function OTPComponent({setIsProcessing}) {
  const otp = useRef();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('/api/admin/admin-otp', {
			otp: otp.current.value,
		})
    console.log(response.data) 
		if(response.data.success) {
			localStorage.setItem('token',response.data.token)
		}
  }
  const BackToLogin = () => {
    setIsProcessing(false)
  }
  return (
    <div className="login-box">
			<form onSubmit={handleSubmit}>
				<h2 className="login-title">Enter OTP</h2>
				<div className="login-input-container">
					<div className="input-box">
						<label htmlFor="password">OTP: <span>*</span></label>
						<input type="number" id='OTP' ref={otp} />
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