import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function DriverDashboardComponent({ setModalShow, bookingDriver }) {
  const changeAvailibility = async => {
    setModalShow(true)
  }

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [bookingDriver, setbookingDriver] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios.post(
      `/get-all-current-bookings`,
      { id: id }.then((response) => {
        if (response.data.success) {
          if (response.data.data.bookingDriver) {
            setbookingDriver(response.data.data.bookingDriver);
          }
        }
      })
    );
  }, []);
  return (
    <div className="admin-dashboard-inner">
      {isLoading && <Loader />}
      <div className="admin-dashboard-upper">
        <h2 className="dashboard-header">Booking Requests</h2>
        <button onClick={changeAvailibility}>Change Ambulance Availibility</button>
      </div>
      <div className="table-responsive">
        {bookingDriver?.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Hospital Name</th>
                <th>ReachedDestination</th>
              </tr>
            </thead>
            <tbody>
              {bookingDriver?.map((booking, key) => {
                return (
                  <tr key={key}>
                    <td>{booking.booking.username}</td>
                    <td>
                      <a href={`tel:${booking.booking.number}`}>
                        {booking.booking.number}
                      </a>
                    </td>
                    <td>{booking.hospital.address}</td>
                    <td>
                      <Link
                        className="button"
                        to={`/booking-request/${booking.driver._id}`}
                      >
                        <i className="fa-location-dot"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <>No Driver Bookings</>
        )}
      </div>
    </div>
  );
}
