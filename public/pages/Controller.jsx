import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import ControllerComponent from '../components/ControllerComponent'
import { useNavigate } from 'react-router-dom';
import AddController from '../components/AddController';
import axios from 'axios';
import Loader from '../components/Loader';

export default function Controller({ checkLogin }) {
  const token = localStorage.getItem('token')
  const [controllers, setControllers] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    checkLogin().then((isLoggedIn) => {
      if (!isLoggedIn) {
        navigate('/')
      }
    });
    const getControllers = async () => {
      const response = await axios.get('/api/controller/admin-getallcontroller', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.success) {
        setControllers(response.data.data)
      }
      setIsLoading(false)
    }
    getControllers()
  }, [])
  
  return (
    <>
      <div className="admin-dashboard">
        {isLoading && <Loader />}
        <Header />
        <SideBar />
        <ControllerComponent controllers={controllers} setModalShow={setModalShow} />
        <AddController show={modalShow} controllers={controllers} setControllers={setControllers} onHide={() => setModalShow(false)} />
      </div>
    </>
  )
}