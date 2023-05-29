import L from "leaflet";
import icon from './../../src/assets/images/map-marker.png'

export default L.icon({
  iconSize: [30, 50],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: icon,
});
