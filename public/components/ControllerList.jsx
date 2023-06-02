import React from "react";
import Axios from "axios";

export default function ControllerList({ controller }) {
  const deleteController = () => {
    const token = localStorage.getItem('token');
    if (confirm("Do you really want to delete Controller") == true) {
      Axios.delete(`/api/controller/deleteController/${controller._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <tr>
      <td>{controller.name}</td>
      <td>
        <a href={`mailto:${controller.email}`}>{controller.email}</a>
      </td>
      <td>{controller.gender}</td>
      <td>
        <a href={`tel:${controller.phoneNo}`}>{controller.phoneNo}</a>
      </td>
      <td>
        <button
          onClick={() => {
            deleteController();
          }}
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
}
