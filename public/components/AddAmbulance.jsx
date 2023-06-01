import axios from "axios";
import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { toast } from "react-toastify";

export default function AddAmbulance({
  show,
  ambulances,
  setAmbulances,
  onHide,
}) {
  const [ambulanceValue, setAmbulanceValue] = useState('');
  const type = useRef();
  const driverName = useRef();
  const driveNo = useRef();
  const driverEmail = useRef();

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const responce = await axios.post(
      "/api/controller/admin-addambulance",
      {
        AmbulanceNumber: ambulanceValue,
        type: type.current.value,
        driverName: driverName.current.value,
        driveNo: driveNo.current.value,
        driverEmail: driverEmail.current.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(responce);
    if (responce.data.success) {
      toast.success(responce.data.message);
      onHide();
      setAmbulances([
        ...ambulances,
        {
          AmbulanceNumber: responce.data.data.AmbulanceNumber,
          Status: responce.data.data.Status,
          type: responce.data.data.type,
          driverName: responce.data.data.driverName,
          driveNo: responce.data.data.driveNo,
          driverEmail: responce.data.data.driverEmail,
        },
      ]);
    } else {
      toast.error(responce.data.message);
    }
  };
  return (
    <Modal show={show} onHide={onHide} className="admin-modal">
      <ModalHeader closeButton>
        <Modal.Title>Add Ambulances</Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row" style={{ "--bs-gutter-y": "30px" }}>
            <div className="col-lg-12">
              <div className="input-box">
                <label htmlFor="AmbulanceNumber">
                  AmbulanceNumber: <span>*</span>
                </label>
                <input
                  type="text"
                  id="AmbulanceNumber"
                  autoFocus
                  required
                  value={ambulanceValue}
                  onInput={(e) => {setAmbulanceValue((e.target.value).toUpperCase())}}
                />
              </div>
            </div>
            <div className="col-lg-6">
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
            <div className="col-lg-6">
              <div className="input-box">
                <label htmlFor="driverName">
                  DriverName: <span>*</span>
                </label>
                <input
                  type="driverName"
                  id="driverName"
                  required
                  ref={driverName}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-box">
                <label htmlFor="driveNo">
                  DriverNo: <span>*</span>
                </label>
                <input type="number" id="driveNo" required ref={driveNo} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-box">
                <label htmlFor="driverEmail">
                  DriverEmail: <span>*</span>
                </label>
                <input
                  type="email"
                  id="driverEmail"
                  required
                  ref={driverEmail}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <button>Create Ambulance</button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
