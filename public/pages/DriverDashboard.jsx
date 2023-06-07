import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import DriverDashboardComponent from '../components/DriverDashboardComponent';
import axios from 'axios';
import ChangeDriverAvaibility from '../components/ChangeDriverAvaibility';
import { io } from "socket.io-client";

const socket = io('https://api-rescueride.onrender.com/', {
	autoConnect: true
})
export default function DriverDashboard({ checkDRIVERLogin }) {
  const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [bookings, setBookings] = useState([]);
	const [driver, setDriver] = useState();
  const [toastMsg, setToastMsg] = useState();
	const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
	useEffect(() => {
		checkDRIVERLogin().then((isLoggedIn) => {
			if (!isLoggedIn) {
				navigate('/driver-signin')
			}
		})
		axios.get(`/api/driver/getUserData`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}).then(response => {
			if(response.data.success) {
				console.log(response.data.data._id)
				socket.emit('join', response.data.data._id)
				setDriver(response.data.data)
			}
		})
	}, [modalShow])
	return (
		<div className='driver-dashboard'>
			{isLoading && <Loader />}
			<Header userType='driver' />
			<SideBar userType='driver' />
			<DriverDashboardComponent socket={socket} toastMsg={toastMsg} setToastMsg={setToastMsg} setModalShow={setModalShow} driver={driver}/>
			<ChangeDriverAvaibility setToastMsg={setToastMsg} show={modalShow} onHide={() => setModalShow(false)} id={driver?._id} driver={driver} />
		</div>
	)
}