import React from 'react';
import logo from '../../src/assets/logo-mini.png'

export default function Loader({opacity = 0.6}) {
  return (
    <div className="loader" style={{backgroundColor: `rgba(255, 255, 255, ${opacity})`}}>
      <div className="loader-inner">
        <span></span>
        <span></span>
        <span></span>
        <img src={logo} className='img-fluid' style={{width: "140px"}} alt="" />
      </div>
    </div>
  )
}
