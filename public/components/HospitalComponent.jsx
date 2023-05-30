import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import HospitalList from './HospitalList';

export default function HospitalComponent({ hospitals, setModalShow }) {
  return (
    <div className='admin-dashboard-inner'>
      <ToastContainer />
      <div className="admin-dashboard-upper">
        <h2 className='dashboard-header'>Hospitals List</h2>
        <button onClick={setModalShow}>Add Hospital</button>
      </div>
      {hospitals?.length ?
        <div className="table-responsive">
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Longitude</th>
                <th>Latitude</th>
              </tr>
            </thead>
            <tbody>
              {hospitals?.map((hospital, key) => {
                return (<HospitalList key={key} hospital={hospital} />)
              })}
            </tbody>
          </table>
        </div> : <>No hospitals found. Please add some hospitals from above button</>}
    </div>
  )
}
