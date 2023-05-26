import React, { useRef } from 'react'

export default function AddControllerComponent() {
  const name = useRef();
  const number = useRef();
  const email = useRef();
  const password = useRef();
  return (
    <div className="admin-dashboard-inner">
      <h2 className='dashboard-header'>Add Controller</h2>
      <form>
        <div className="row" style={{ '--bs-gutter-y': '30px' }}>
          <div className="col-lg-6">
            <div className="input-box">
              <label htmlFor="name">Name: <span>*</span></label>
              <input type="text" id='name' ref={name} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-box">
              <label htmlFor="number">Number: <span>*</span></label>
              <input type="number" id='number' ref={number} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-box">
              <label htmlFor="email">E-mail: <span>*</span></label>
              <input type="email" id='email' ref={email} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-box">
              <label htmlFor="password">Password: <span>*</span></label>
              <input type="password" id='password' ref={password} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
