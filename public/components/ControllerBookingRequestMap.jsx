import { Icon } from 'leaflet'
import MarkerClusterGroup from '@christopherpickering/react-leaflet-markercluster';
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import icon from './../../src/assets/images/ambulance-icon.png'
import mapIcon from './../../src/assets/images/map-marker.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080', {
  autoConnect: false
})

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 11, {
      animate: true
    });
  }, [lat, lng]);
  return null;
}


export default function ControllerBookingRequestMap({ bookingId, position, booking }) {
  const token = localStorage.getItem('token')
  const [ambulances, setAmbulances] = useState([]);
  const [ambulanceNo, setAmbulanceNo] = useState();
  const [toastMsg, setToastMsg] = useState({});
  const mapMarker = new Icon({
    iconUrl: mapIcon,
    iconSize: [30, 50]
  })
  const ambulanceIcon = new Icon({
    iconUrl: icon,
    iconSize: [25, 40]
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.post('/api/controller/controller-getambulance', {
      latitude: position.latitude,
      longitude: position.longitude,
      type: booking?.type_of_ambulance
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      setAmbulances([])
      response?.data?.data?.map((ambulance) => {
        setAmbulances(ambulances => (
          { ...ambulances, [ambulance._id]: ambulance }
          ))
      })
    })
    if(toastMsg.type) {
      toast.success(toastMsg.message)
    } else {
      toast.error(toastMsg.message)
    }
  }, [position, toastMsg])
  
  useEffect(() => {
    socket.connect();
    // socket.on('get_new_location', data => {
    //   console.log(data)
    // })
    // return() => {
    //   socket.off('get_new_location')
    // }
  },[socket])
  
  const bookHandler = async (id) => {
    axios.post('/api/driver/update-booking-status', {
      ambulanceId: id,
      bookingId: bookingId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data)
      setToastMsg({ type: response.data.success, message: response.data.message })
    })
    socket.emit('join', id)
    socket.emit('update-booking-status',id)
  }
  return (
    <>
      <ToastContainer />
      {position && booking &&
        <div className="booking-map" style={{ marginLeft: '400px' }}>
          <MapContainer eventHandlers={{
            click: (e) => {
              console.log(e)
              // setHospitalID(hospital._id)
            },
          }}
            className="markercluster-map"
            center={[position.latitude, position.longitude]}
            zoom={11}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[position.latitude, position.longitude]} icon={mapMarker}>
              <Popup>
                <h6 style={{ fontWeight: "600" }}>{booking?.username}</h6>
                {position.latitude.toFixed(7)}, {position.longitude.toFixed(7)}
              </Popup>
            </Marker>
            <MarkerClusterGroup>
              {Object.keys(ambulances).map((key, index) => {
                return (
                  <Marker key={index} position={[ambulances[key].latitude, ambulances[key].longitude]} icon={ambulanceIcon}>
                    <Popup>
                      <div className="hostpital-popup">
                        <h4>{ambulances[key].AmbulanceNumber}</h4>
                        <button onClick={() => bookHandler(ambulances[key]._id)}>Book</button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
            <RecenterAutomatically lat={position.latitude} lng={position.longitude} />
          </MapContainer>
        </div>
      }
    </>
  )
}
