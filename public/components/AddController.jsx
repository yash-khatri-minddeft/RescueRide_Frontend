import axios from 'axios';
import React, { useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { toast } from 'react-toastify';

export default function AddController({show, controllers, setControllers, onHide}) {
  const name = useRef();
  const number = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async e => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    const response = await axios.post('/api/controller/admin-addcontroller', {
      name: name.current.value,
      email: email.current.value,
      phoneNo: number.current.value,
      password: password.current.value
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(response)
    if (response.data.success) {
      toast.success(response.data.message)  
      onHide()
      setControllers([...controllers ,{name: response.data.data.name ,email:response.data.data.email, phoneNo: response.data.data.phoneNo}])
    } else {
      toast.error(response.data.message)
    }
  }
  return (
    <Modal show={show} onHide={onHide} className='controller-modal'>
      <ModalHeader closeButton>
        <Modal.Title>Add Controllers</Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row" style={{ '--bs-gutter-y': '30px' }}>
            <div className="col-lg-6">
              <div className="input-box">
                <label htmlFor="name">Name: <span>*</span></label>
                <input type="text" id='name' autoFocus required ref={name} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-box">
                <label htmlFor="number">Number: <span>*</span></label>
                <input type="number" id='number' required ref={number} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-box">
                <label htmlFor="email">E-mail: <span>*</span></label>
                <input type="email" id='email' required ref={email} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-box">
                <label htmlFor="password">Password: <span>*</span></label>
                <input type="password" id='password' required ref={password} />
              </div>
            </div>
            <div className="col-lg-12">
              <button>Create Controller</button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
