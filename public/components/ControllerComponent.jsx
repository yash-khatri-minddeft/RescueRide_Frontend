import axios from 'axios';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import ControllerList from './ControllerList';

export default function ControllerComponent({ controllers, setModalShow }) {
  return (
    <div className="admin-dashboard-inner">
      <ToastContainer />
      <div className="admin-dashboard-upper">
        <h2 className='dashboard-header'>Controllers List</h2>
        <button onClick={setModalShow}>Add Controller</button>
      </div>
      {controllers?.length ?
        <div className="table-responsive">
          <table className='table'>
            <thead>
              <tr>
                <th>Controller Name</th>
                <th>Controller Email</th>
                <th>Controller PhoneNo</th>
              </tr>
            </thead>
            <tbody>
              {controllers?.map((controller, key) => {
                return (<ControllerList key={key} controller={controller} />)
              })}
            </tbody>
          </table>
        </div> : <>No controllers found. Please add some controllers from above button</>}

    </div>
  )
}
