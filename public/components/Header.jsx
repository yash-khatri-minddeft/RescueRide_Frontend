import React from 'react'
import logo from "../../src/assets/logo-main.png"
export default function Header() {
  return (
    <div className="header">
        <div className="header-inner">
          <div className="logo-left">
            <img src={logo} className="img-fluid" alt="" />
          </div>
          <ul className='list-unstyled'></ul>
          <div className="admin-details">
            <div className="span">Admin</div>
          </div>
        </div>
    </div>
  )
}
