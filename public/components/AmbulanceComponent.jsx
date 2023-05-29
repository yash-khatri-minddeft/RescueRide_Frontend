import React from "react";
import AmbulanceList from "./AmbulanceList";
import { ToastContainer } from "react-toastify";

export default function AmbulanceComponent({ ambulances, setModalShow }) {
  return (
    <div className="admin-dashboard-inner">
      <ToastContainer />
      <div className="admin-dashboard-upper">
        <h2 className="dashboard-header">Ambulances List</h2>
        <button onClick={setModalShow}>Add Ambulance</button>
      </div>
      {ambulances?.length ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>AmbulanceNumber</th>
                <th>Status</th>
                <th>Type</th>
                <th>DriverName</th>
                <th>DriverNo</th>
                <th>DriverEmail</th>
              </tr>
            </thead>
            <tbody>
              {ambulances?.map((ambulance, key) => {
                return <AmbulanceList key={key} ambulance={ambulance} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>No ambulances found. Please add some ambulances from above button</>
      )}
    </div>
  );
}
