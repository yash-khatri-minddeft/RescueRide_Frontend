import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";

const socket = io('https://api-rescueride.onrender.com/', {
	autoConnect: true
})


export default function DriverDashboardComponent({ toastMsg, setToastMsg, setModalShow, driver }) {
  const changeAvailibility = async => {
    setModalShow(true)
  }

  const token = localStorage.getItem("token");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [booking, setBooking] = useState();
  const [hospital, setHospital] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.post('/api/driver/get-all-current-bookings', {
      id: driver?._id
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.data.success) {
        setBooking(response.data.data)
        axios.post('/api/controller/get-hospital-by-id', {
          id: response?.data?.data?.hospitalid
        }).then(getHospital => {
          setHospital(getHospital.data.data)
        })
      }
      setIsLoading(false)
    })
  }, [driver, toastMsg]);
  useEffect(() => {
    if (toastMsg?.type) {
      toast.success(toastMsg?.message)
    } else {
      toast.error(toastMsg?.message)
    }
  }, [toastMsg])
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
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }, (err) => {
        if (err.code === 1) {
          setErrorMessage('Please turn on location from settings or enter your location')
        }
      }, {
        enableHighAccuracy: true,
      });
    }
  }, [])
  const handleDestination = () => {
    const accept = confirm('Reached to Destination?');
    if (accept) {
      setIsLoading(true);
      axios.post('/api/driver/change-booking-ambulance-status', {
        bookingId: booking?._id,
        ambulanceId: driver?._id,
        latitude: latitude,
        longitude: longitude
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        // if (response.data.success) {
        setToastMsg({ type: response.data.success, message: response.data.message })
        setIsLoading(false)
        // }
      })
    }
  }
  return (
    <div className="admin-dashboard-inner">
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="admin-dashboard-upper">
        <h2 className="dashboard-header">Booking Requests</h2>
        <button onClick={changeAvailibility}>Change Ambulance Availibility</button>
      </div>
      <div className="table-responsive">
        {booking && hospital ?
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Hospital Name</th>
                <th>ReachedDestination</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{booking.username}</td>
                <td>
                  <a href={`tel:${booking.number}`}>
                    {booking.number}
                  </a>
                </td>
                <td>{hospital?.address}</td>
                <td><button onClick={handleDestination}>Reached Destination</button></td>
              </tr>
            </tbody>
          </table>
          :
          <>No Driver Bookings</>
        }
      </div>
    </div>
  );
}
