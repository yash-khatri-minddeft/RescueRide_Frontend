import axios from 'axios';
import React, { useRef } from 'react';
import Modal from "react-bootstrap/Modal";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

export default function ChangeDriverAvaibility({ setToastMsg, show, onHide, id, driver }) {
  const token = localStorage.getItem('token');
  const availibility = useRef();
  const handleSubmit = async e => {
    e.preventDefault();
    axios.post('/api/driver/change-ambulance-availibility', {
      id: id,
      status: availibility.current.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      console.log(response)
      setToastMsg({type: response.data.success, message: response.data.message})
      onHide()
    })
  }
  return (
    <Modal show={show} onHide={onHide} centered className="admin-modal">
      <ModalHeader closeButton>
        <Modal.Title>Change your Availibility</Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row" style={{ "--bs-gutter-y": "30px" }}>
            <div className="col-md-12">
              <div className="input-box">
                <label htmlFor="changeAvailibility">Change Availibility *</label>
                <select id="changeAvailibility" defaultValue={driver?.Status == 'ideal' ? 'N/A' : 'ideal'} ref={availibility}>
                  <option value="ideal">Available</option>
                  <option value="N/A">Not Available</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <button>Submit</button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
