import React, { useEffect,useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import HospitalComponent from '../components/HospitalComponent'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddHospital from '../components/AddHospital';
import Loader from '../components/Loader';

export default function Hospital({checkLogin}) {
  const token = localStorage.getItem('token')
  const [hospitals, setHospitals] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
	const [latitudeState, setLatitudeState] = useState();
	const [longitudeState, setLongitudeState] = useState();
  const [locationEnabled, setLocationEnabled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/admin-signin')
      }
    });
    const getHospitals = async() => {
      const responce = await axios.get('/api/controller/admin-gethospital',{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      if (responce.data.success) {
        setHospitals(responce.data.data)
      }
      setIsLoading(false)
    }
    getHospitals()

    if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position.coords.latitude, position.coords.longitude)
				// const newPosition = {
				// 	id: ambulanceId,
				// 	latitude: position.coords.latitude,
				// 	longitude: position.coords.longitude
				// }
				setLatitudeState(position.coords.latitude)
				setLongitudeState(position.coords.longitude)
        setLocationEnabled(true)
				// socket.emit('update_location', newPosition)
			}, (err) => {
				if (err.code === 1) {
					alert('Please turn on location from settings or enter your location')
				}
        setLatitudeState(0)
        setLongitudeState(0)
			}, {
				enableHighAccuracy: true,
			});
		}
    
  }, [])
  return (
    <>
      <div className="admin-dashboard">
      {isLoading && <Loader />}
        <Header userType="admin" />
        <SideBar userType='admin' />
        <HospitalComponent hospitals={hospitals} setModalShow={setModalShow}/>
        <AddHospital show={modalShow} hospitals={hospitals} setHospitals={setHospitals} onHide={() => setModalShow(false)}locationEnabled={locationEnabled} latitudeState={latitudeState} longitudeState={longitudeState} setLatitudeState={setLatitudeState} setLongitudeState={setLongitudeState} />
      </div>
    </>
  )
}
