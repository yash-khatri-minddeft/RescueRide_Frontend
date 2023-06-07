import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import BookingDetailCurrentLocationRouter from './BookingDetailCurrentLocationRouter';
import icon from './../../src/assets/images/ambulance-icon.png'
import mapIcon from './../../src/assets/images/map-marker.png';
import { Icon } from 'leaflet';

export default function AmbulanceRouteComponent({ ambulance }) {

  const [waypoints, setWaypoints] = useState([]);
  const mapMarker = new Icon({
    iconUrl: mapIcon,
    iconSize: [30, 50]
  })
  const ambulanceIcon = new Icon({
    iconUrl: icon,
    iconSize: [25, 40]
  })

  useEffect(() => {
    console.log(ambulance?.route)
    const setRoutes = async () => {
      var route = await get_route(ambulance.route);
      setWaypoints(route);
    }
    if (ambulance) {
      setRoutes()
    }
  }, [ambulance])
  async function get_route(waypoints) {
    let temp = []
    for (let i = 0; i < waypoints?.length; i++) {
      temp.push(L.latLng(waypoints[i].r_latitude, waypoints[i].r_longitude))
    }
    return temp;
  }
  return (
    <div className="admin-dashboard-inner">
      {ambulance &&
        <div className="ambulance-route-map" style={{ height: '500px' }}>
          {console.log(ambulance)}
          <MapContainer center={[0, 0]} zoom={12}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <BookingDetailCurrentLocationRouter waypoints={waypoints.length ? waypoints : null} />
            <Marker position={[ambulance.route[0].r_latitude, ambulance.route[0].r_longitude]} icon={mapMarker}>
              <Popup>
                <h6 style={{ fontWeight: '700' }}>Start Location</h6>
                {ambulance.route[0].r_latitude},{ambulance.route[0].r_longitude}
              </Popup>
            </Marker>
            <Marker position={[ambulance.route[ambulance.route.length - 1].r_latitude, ambulance.route[ambulance.route.length - 1].r_longitude]} icon={ambulanceIcon}>
              <Popup>
                <h6 style={{ fontWeight: '700' }}>Current Location</h6>
                {ambulance.route[ambulance.route.length - 1].r_latitude},{ambulance.route[ambulance.route.length - 1].r_longitude}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      }
    </div>
  )
}
