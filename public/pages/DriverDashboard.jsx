import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import DriverDashboardComponent from '../components/DriverDashboardComponent';
import axios from 'axios';
import ChangeDriverAvaibility from '../components/ChangeDriverAvaibility';
import { io } from "socket.io-client";

const socket = io('http://localhost:8080', {
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
  const [booking, setBooking] = useState();
  const [hospital, setHospital] = useState();
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
				socket.emit('join', response.data.data._id)
				setDriver(response.data.data)
			}
		})
	}, [modalShow])
  useEffect(() => {
		socket.on('get_new_location', data => {
			console.log(data)
      setBooking(data[0])
      setHospital(data[1])
		})
		return() => {
			socket.off('get_new_location')
		}
	},[socket])
	return (
		<div className='driver-dashboard'>
			{isLoading && <Loader />}
			<Header userType='driver' />
			<SideBar userType='driver' />
			<DriverDashboardComponent booking={booking} setBooking={setBooking} hospital={hospital} setHospital={setHospital} toastMsg={toastMsg} setToastMsg={setToastMsg} setModalShow={setModalShow} driver={driver}/>
			<ChangeDriverAvaibility setToastMsg={setToastMsg} show={modalShow} onHide={() => setModalShow(false)} id={driver?._id} driver={driver} />
		</div>
	)
}