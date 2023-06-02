import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from '@christopherpickering/react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import '@christopherpickering/react-leaflet-markercluster/dist/styles.min.css';
import icon from './../../src/assets/images/hospital-icon.png'
import mapIcon from './../../src/assets/images/map-marker.png'
import { Icon } from 'leaflet';
import axios from 'axios';
import LeafletControlGeocoder from './LeafletControlGeocoder';
import { ToastContainer, toast } from 'react-toastify';
import BookPopup from './BookPopup';

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 11, {
      animate: true
    });
  }, [lat, lng]);
  return null;
}


export default function BookingMap({ errorMessage, longitude, latitude, setLatitude, setLongitude }) {
  const [hospitals, setHospitals] = useState();
  const [username, setUsername] = useState();
  const [userEmail, setUserEmail] = useState();
  const [hospitalID, setHospitalID] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [toastMsg, setToastMsg] = useState({ type: '', message: '' });
  useEffect(() => {
    axios.post('/api/controller/user-gethospital', { latitude: latitude, longitude: longitude })
      .then(response => {
        setHospitals(response.data.data)
        console.log(response.data.data)
      })
  }, [latitude, longitude])

  useEffect(() => {
    if (errorMessage !== null) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  useEffect(() => {
    if (toastMsg.type == 'success') {
      toast.success(toastMsg.message, {
        autoClose:2000
      })
    } else if (toastMsg.type == 'error') {
      toast.error(toastMsg.message)
    }
  }, [toastMsg])

  const ambulanceIcon = new Icon({
    iconUrl: icon,
    iconSize: [40, 40]
  })
  const mapMarker = new Icon({
    iconUrl: mapIcon,
    iconSize: [30, 50]
  })
  const position = [latitude, longitude];

  const bookHospital = () => {
    setModalShow(true)
  }

  return (
    <div className="booking-map">
      <ToastContainer />
      <MapContainer
        className="markercluster-map"
        center={position}
        zoom={11}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LeafletControlGeocoder setLatitude={setLatitude} setLongitude={setLongitude} />

        <Marker position={position} icon={mapMarker}>
          <Popup>
            <h6 style={{ fontWeight: "600" }}>Your Location</h6>
            {latitude}, {longitude}
          </Popup>
        </Marker>
        <RecenterAutomatically lat={latitude} lng={longitude} />
        <MarkerClusterGroup>
          {hospitals?.map((hospital, key) => {
            return (
              <Marker
                eventHandlers={{
                  click: (e) => {
                    setHospitalID(hospital._id)
                  },
                }} key={key} position={[hospital.latitude, hospital.longitude]} icon={ambulanceIcon}>
                <Popup>
                  <div className="hostpital-popup">
                    <h4>{hospital.address}</h4>
                    <button onClick={bookHospital}>Book</button>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </MapContainer>
      <BookPopup longitude={longitude} latitude={latitude} modalShow={modalShow} setModalShow={setModalShow} hospitalID={hospitalID} setToastMsg={setToastMsg} />
    </div>
  )
}
