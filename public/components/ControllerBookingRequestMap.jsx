import { Icon } from 'leaflet'
import MarkerClusterGroup from '@christopherpickering/react-leaflet-markercluster';
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import icon from './../../src/assets/images/ambulance-icon.png'
import mapIcon from './../../src/assets/images/map-marker.png';
import axios from 'axios';

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 11, {
      animate: true
    });
  }, [lat, lng]);
  return null;
}

export default function ControllerBookingRequestMap({ position, booking }) {
  const [ambulances, setAmbulances] = useState([]);
  const [ambulanceNo, setAmbulanceNo] = useState();
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
      response?.data?.data?.map((el) => {
        console.log(el)
        setAmbulances(ambulances => (
          { ...ambulances, [el._id]: el }
        ))
        setAmbulances(ambulances => (
          { ...ambulances, ['asd']: el }
        ))
      })
    })
  }, [position])

  const bookHandler = async (id) => {

  }
  return (
    <>
      {console.log("suiii", ambulances)}
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
              {/* {ambulances?.map((ambulance, key) => {
                return (
                  <Marker key={key} position={[ambulance.latitude, ambulance.longitude]} icon={ambulanceIcon}>
                    <Popup>
                      <div className="hostpital-popup">
                        <h4>{ambulance.AmbulanceNumber}</h4>
                        <button onClick={() => bookHandler(ambulance._id)}>Book</button>
                      </div>
                    </Popup>
                  </Marker>
                )
              })} */}
              {Object.keys(ambulances).map((key, index) => {
                console.log(ambulances[key])
                return (
                  <div key={index}>
                    <h2>
                      {key}: 
                    </h2>

                    <hr />
                  </div>
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
