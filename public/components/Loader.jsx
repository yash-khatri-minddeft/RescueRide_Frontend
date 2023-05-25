import React from 'react';
import logo from '../../src/assets/logo-mini.png'

export default function Loader() {
  return (
    <div className="loader">
      <img src={logo} className='img-fluid' style={{width: "140px"}} alt="" />
    </div>
  )
}
