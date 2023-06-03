import React, { useEffect } from 'react';
import 'leaflet-routing-machine';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function BookingDetailCurrentLocationRouter({ userCoords, hospitalCoords }) {
  
  const map = useMap();
  useEffect(() => {
    const Routes = document.querySelector('.leaflet-routing-container')
    L.Routing.control({
      waypoints: [
        L.latLng(userCoords.latitude, userCoords.longitude),
        L.latLng(hospitalCoords.latitude, hospitalCoords.longitude)
      ],
      showAlternatives: true,
      routeWhileDragging: true,
      addWaypoints: false,
      draggableWaypoints: true,
      createMarker: function() { return null; },lineOptions: {
        styles: [
          {
            color: "#325863",
            opacity: 1,
            weight: 4
          }
        ]
      }
    }).addTo(map);
    console.log(L)
  }, [userCoords, hospitalCoords])
  return null;
}
