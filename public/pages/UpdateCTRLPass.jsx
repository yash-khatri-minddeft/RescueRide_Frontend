import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../src/assets/logo.png'

export default function UpdateCTRLPass() {
  const [searchParams, setSearchParams] = useSearchParams();
  const password = useRef();
  const cPassword = useRef();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.post('/api/controller/ctrl-pass-update', {
      token: token,
      password: password.current.value,
      cPassword: cPassword.current.value
    });
    if (response.data.success) {
      toast.success(response.data.message)
      localStorage.setItem('token',response.data.token)
      navigate(`/${response.data.userType}-dashboard`)
    } else {
      toast.error(response.data.message)
    }
  }
  return (
    <>
      <div className="login-page">
        <div className="contailer">
          <div className="logo-box text-center">
            <img src={logo} className="img-fluid" alt="" />
          </div>
          <div className="login-box">
            <form onSubmit={handleSubmit}>
              <h2 className="login-title">Change Password</h2>
              <div className="login-input-container">
                <div className="input-box">
                  <label htmlFor="password">Password: <span>*</span></label>
                  <input type="password" id='password' required ref={password} />
                </div>
                <div className="input-box">
                  <label htmlFor="c-password">Confirm Password: <span>*</span></label>
                  <input type="password" id='c-password' required ref={cPassword} />
                </div>
                <div className="input-box" style={{ marginTop: "15px" }}>
                  <button>Sign In</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
