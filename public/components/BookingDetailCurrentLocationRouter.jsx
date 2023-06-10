import React, { useEffect, useState } from 'react';
import 'leaflet-routing-machine';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
var routerPoints = null;

export default function BookingDetailCurrentLocationRouter({ waypoints }) {

  const map = useMap();
  useEffect(() => {
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

  }, [waypoints])
  return null;
}
