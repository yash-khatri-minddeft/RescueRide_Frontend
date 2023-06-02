import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import HomePageBanner from './HomePageBanner'

export default function HomePage({ checkLogin, checkCTRLLogin, checkDRIVERLogin }) {
  const [userType, setUserType] = useState();
  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (isLoggedIn) {
        setUserType('admin')
      }
    });
    checkCTRLLogin().then((isLoggedIn) => {
      if (isLoggedIn) {
        setUserType('controller')
      }
    });
    checkDRIVERLogin().then((isLoggedIn) => {
      if (isLoggedIn) {
        setUserType('driver')
      }
    })
  }, [])
  return (
    <div className="home-page">
      <Header userType={userType} />
      <HomePageBanner />
    </div>
  )
}
