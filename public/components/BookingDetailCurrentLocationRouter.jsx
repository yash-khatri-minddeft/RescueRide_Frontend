import React, { useEffect, useState } from 'react';
import 'leaflet-routing-machine';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
var routerPoints = null;

export default function BookingDetailCurrentLocationRouter({ waypoints }) {

  const map = useMap();
  // const waypoints = [];
  useEffect(() => {
    console.log(waypoints)
    if(routerPoints !== null) {
      map.removeControl(routerPoints);
      routerPoints = null
    }
    routerPoints = L.Routing.control({
      waypoints: waypoints,
      showAlternatives: true,
      routeWhileDragging: true,
      addWaypoints: false,
      draggableWaypoints: true,
      createMarker: function () { return null; },
      lineOptions: {
        styles: [
          {
            color: "#325863",
            opacity: 1,
            weight: 4
          }
        ]
      }
    }).addTo(map);
  // }
    // if (userCoords && hospitalCoords) {
    //   setWaypoints([
    //     L.latLng(userCoords.latitude, userCoords.longitude),
    //     L.latLng(hospitalCoords.latitude, hospitalCoords.longitude)
    //   ])
    // }
    // if (coords) {
    //   coords.map((coord) => {
    //     setWaypoints((waypoints) => [...waypoints, L.latLng(coord.r_latitude, coord.r_longitude)])
    //     // waypoints.push(L.latLng(coord.r_latitude, coord.r_longitude))
    //   })
    // }
    // const routes = document.querySelector('.leaflet-routing-container')
    // if (waypoints) {
    //   console.log(waypoints)
      
  }, [waypoints])
  return null;
}
