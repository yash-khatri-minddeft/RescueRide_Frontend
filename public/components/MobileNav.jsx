import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoLight from "../../src/assets/logo-light.png"

export default function MobileNav({ listItems, userType, isMobileOpen, toggleMobileMenu }) {
  return (
    <div className={`mobile-header${isMobileOpen ? " active" : ''}`}>
      <div className="mobile-nav-overlay" onClick={toggleMobileMenu} />
      <div className="mobile-header-inner">
        <div className="close-btn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
        </div>
        <div className="mobile-logo">
          <Link to="/"><img src={logoLight} alt="" className='img-fluid' /></Link>
        </div>
        <ul className='mobile-nav-bar list-unstyled'>
          {listItems?.map((list, key) => {
            return (
              <li key={key}><NavLink to={list.link}>{list.text}</NavLink></li>
            )
          })}
          {userType != 'guest' && <li><NavLink to={`/${userType}-dashboard`}>Dashboard</NavLink></li>}
        </ul>
      </div>
    </div>
  )
}
