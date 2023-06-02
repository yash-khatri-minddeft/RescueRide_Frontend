import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client';
import Loader from '../components/Loader';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const socket = io('http://localhost:8080',{
    autoConnect:false
})

export default function DriverDashboard ({checkDRIVERLogin}) {
    const navigate = useNavigate();
    const [bookings,setBookings] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    useEffect(() => {
        checkDRIVERLogin().then((isLoggedIn) => {
            if (!isLoggedIn) {
                navigate('/')
            }
        })
    },[])
    return(
        <div className='driver-dashboard'>
            {isLoading && <Loader/>}
            <Header userType='driver'/>
            <SideBar userType='driver'/>
        </div>
    )
}
