import React, { useEffect,useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AmbulanceComponent from '../components/AmbulanceComponent'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AddAmbulance from '../components/AddAmbulance'
import Loader from '../components/Loader';

export default function Ambulance({checkLogin}) {
  const token = localStorage.getItem('token')
  const [ambulances, setAmbulances] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/')
      }
    });
    const getAmbulances = async() => {
      const response = await axios.get('/api/controller/admin-getambulance', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.success) {
        setAmbulances(response.data.data)
      }
      setIsLoading(false)
    }
    getAmbulances()
  }, [])
  return (
    <>
      <div className="admin-dashboard">
      {isLoading && <Loader />}
        <Header userType="admin"/>
        <SideBar />
        <AmbulanceComponent ambulances={ambulances} setModalShow={setModalShow}/>
        <AddAmbulance show={modalShow} ambulances={ambulances} setAmbulances={setAmbulances} onHide={() => setModalShow(false)}/>
      </div>
    </>
  )
}
