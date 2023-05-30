import axios from 'axios';
import React, { useRef } from 'react'
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function BookPopup({ longitude, latitude, modalShow, setModalShow, hospitalID, toastMsg, setToastMsg }) {
	const username = useRef();
	const number = useRef();
	const type = useRef();
	const handleSubmit = async e => {
		e.preventDefault();
		axios.post('/api/controller/add-booking', {
			username: username.current.value,
			number: number.current.value,
			user_longitude: longitude,
			user_latitude: latitude,
			hospitalid: hospitalID,
			type_of_ambulance: type.current.value
		}).then((response) => {
			console.log(response)
			if(response.data.success) {
				setModalShow(false)
				setToastMsg({type:'success',message:'Ambulance Booking is Pending.Please wait for confirmation'})
				localStorage.setItem('bookingID',response.data.data._id)
			}
		})
		.catch((err) => {
			setToastMsg({type:'error',message:'Error while booking Ambulance!'})
				console.log(err.response)
			})
	}
	return (
		<Modal show={modalShow} onHide={() => setModalShow(false)} className="admin-modal" centered>
			<ModalHeader closeButton>
				<Modal.Title>
					Please Enter your Details
				</Modal.Title>
			</ModalHeader>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<div className="row" style={{ '--bs-gutter-y': "30px" }}>
						<div className="col-lg-6">
							<div className="input-box">
								<label htmlFor="username">
									Your Name: <span>*</span>
								</label>
								<input type="text" id="username" required ref={username} />
							</div>
						</div>
						<div className="col-lg-6">
							<div className="input-box">
								<label htmlFor="phoneno">
									Your Number: <span>*</span>
								</label>
								<input type="text" id="phoneno" required ref={number} />
							</div>
						</div>
						<div className="col-lg-12">
							<div className="input-box">
								<label htmlFor="type">
									Type: <span>*</span>
								</label>
								<select name="type" id="type" required ref={type}>
									<option value="">Select Type</option>
									<option value="Mini">Mini</option>
									<option value="Large">Large</option>
								</select>
							</div>
						</div>
						<div className="col-lg-12">
							<button>Book Ambulance</button>
						</div>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	)
}
