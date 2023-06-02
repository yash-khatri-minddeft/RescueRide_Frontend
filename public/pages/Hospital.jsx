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
  }, [])
  return (
    <>
      <div className="admin-dashboard">
      {isLoading && <Loader />}
        <Header userType="admin" />
        <SideBar userType='admin' />
        <HospitalComponent hospitals={hospitals} setModalShow={setModalShow}/>
        <AddHospital show={modalShow} hospitals={hospitals} setHospitals={setHospitals} onHide={() => setModalShow(false)}/>
      </div>
    </>
  )
}
