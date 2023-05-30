import React, { useRef } from 'react'
import Loader from './Loader'
import axios from 'axios';

export default function ControllerSignInComponent({ setIsProcessing, setToastText, setMaskedEmail, isLoading, setIsLoading }) {
  const email = useRef();
  const password = useRef();
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await axios.post('/api/controller/controller-login', {
        email: email.current.value,
        password: password.current.value
      })
      console.log(response)
      if (response.data.success) {
        setToastText({ text: 'OTP sent!', type: 'success' })
        setIsProcessing(true)
        setMaskedEmail(response.data.message)
      } else {
        // alert(response.data.message)
        setToastText({ text: response.data.message, type: 'error' })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2 className="login-title">Controller SignIn</h2>
          <div className="login-input-container">
            <div className="input-box">
              <label htmlFor="email">Email: <span>*</span></label>
              <input type="email" id='email' autoFocus required ref={email} />
            </div>
            <div className="input-box">
              <label htmlFor="password">Password: <span>*</span></label>
              <input type="password" id='password' required ref={password} />
            </div>
            <div className="input-box" style={{ marginTop: "15px" }}>
              <button>Sign In</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
