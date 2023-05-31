import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

export default function ControllerDashboard({checkCTRLLogin}) {
  const navigate = useNavigate();
  useEffect(() => {
    checkCTRLLogin().then((isLoggedIn) => {
      console.log(isLoggedIn);
      if (!isLoggedIn) {
        navigate('/')
      }
    });
  })
  return (
    <div className="contoller-dashboard">
      <Header userType="controller" />
    </div>
  )
}
