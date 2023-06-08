import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { toast } from "react-toastify";
import mapIcon from './../../src/assets/images/hospital-icon.png'
import { Icon } from 'leaflet';
import LeafletControlGeocoder from "./LeafletControlGeocoder";


const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], null, {
      animate: true
    });
  }, [lat, lng]);
  return null;
}


export default function AddHospital({ show, hospitals, setHospitals, onHide, locationEnabled, latitudeState, longitudeState, setLatitudeState, setLongitudeState }) {
	const address = useRef();
	const mapMarker = new Icon({
		iconUrl: mapIcon,
		iconSize: [45, 50]
	})
	const MapEvents = () => {
		useMapEvents({
			click(e) {
				// setState your coords here
				// coords exist in "e.latlng.lat" and "e.latlng.lng"
				setLatitudeState(e.latlng.lat)
				setLongitudeState(e.latlng.lng)
			},
		});
		return false;
	}

	const handleSubmit = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const response = await axios.post(
			"/api/controller/admin-addhospital",
			{
				address: address.current.value,
				longitude: longitudeState,
				latitude: latitudeState,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(response);
		if (response.data.success) {
			toast.success(response.data.message);
			console.log(response.data);
			onHide();
			setHospitals([
				...hospitals,
				{
					address: response.data.data.address,
					longitude: response.data.data.longitude,
					latitude: response.data.data.latitude,
				},
			]);
		} else {
			toast.error(response.data.message);
		}
	};
	return (
		<Modal show={show} onHide={onHide} className="admin-modal">
			<ModalHeader closeButton>
				<Modal.Title>Add Hospitals</Modal.Title>
			</ModalHeader>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<div className="row" style={{ "--bs-gutter-y": "30px" }}>
						<div className="col-lg-12">
							<div className="input-box">
								<label htmlFor="address">
									Address: <span>*</span>
								</label>
								<textarea id="address" autoFocus required ref={address} />
							</div>
						</div>
						{locationEnabled ?
							<div className="col-lg-12">
								<div className="add-ambulance-map" style={{ height: '250px' }}>
									<MapContainer center={[latitudeState, longitudeState]} zoom={12}>
										<TileLayer
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
											attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
										/>
										<LeafletControlGeocoder setLatitude={setLatitudeState} setLongitude={setLongitudeState} />
										<Marker position={[latitudeState, longitudeState]} icon={mapMarker}>
											<Popup>
												<h6 style={{fontWeight: '600'}}>Your Location</h6>
												{latitudeState.toFixed(7)}, {longitudeState.toFixed(7)}
											</Popup>
										</Marker>
										<MapEvents />
										<RecenterAutomatically lat={latitudeState} lng={longitudeState} />
									</MapContainer>
								</div>
							</div> :
							<>
								<div className="col-lg-6">
									<div className="input-box">
										<label htmlFor="latitude">
											Latitude: <span>*</span>
										</label>
										<input type="number" step='0.00000000001' value={locationEnabled && latitudeState.toFixed(7)} readOnly={locationEnabled} min="-90" max="90" id="latitude" required onChange={(e) => { setLatitudeState(e.target.value) }} />
									</div>
								</div>
								<div className="col-lg-6">
									<div className="input-box">
										<label htmlFor="longitude">
											Longitude: <span>*</span>
										</label>
										<input
											type="number"
											id="longitude"
											required
											onChange={(e) => { setLongitudeState(e.target.value) }}
											readOnly={locationEnabled}
											min="-180"
											max="180"
											step='0.00000000001'
										/>
									</div>
								</div>
							</>
						}
						<div className="col-lg-12">
							<button>Create Hospital</button>
						</div>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
}
