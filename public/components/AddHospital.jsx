import axios from "axios";
import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { toast } from "react-toastify";

export default function AddHospital({ show, hospitals, setHospitals, onHide }) {
	const address = useRef();
	const longitude = useRef();
	const latitude = useRef();

	const handleSubmit = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const response = await axios.post(
			"/api/controller/admin-addhospital",
			{
				address: address.current.value,
				longitude: longitude.current.value,
				latitude: latitude.current.value,
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
						<div className="col-lg-6">
							<div className="input-box">
								<label htmlFor="latitude">
									Latitude: <span>*</span>
								</label>
								<input type="number" step='0.00000000001' min="-90" max="90" id="latitude" required ref={latitude} />
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
									min="-180"
									max="180"
									step='0.00000000001'
									ref={longitude}
								/>
							</div>
						</div>
						<div className="col-lg-12">
							<button>Create Hospital</button>
						</div>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
}
