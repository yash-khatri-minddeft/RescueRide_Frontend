import React from 'react'

export default function ControllerList({ controller}) {
  const deleteController= () => {
    let data;
    if (confirm('Press The Button') == true) {
      
    }
    else
    {
      data = 'Cancelled';
    }
    document.get('')
  }
  const deleteHandle = async e => {
    e.preventDefault();
  }
  return (
    <tr>
      <td>{controller.name}</td>
      <td><a href={`mailto:${controller.email}`}>{controller.email}</a></td>
      <td>{controller.gender}</td>
      <td><a href={`tel:${controller.phoneNo}`}>{controller.phoneNo}</a></td>
      <td>
        <button className='button-secondary me-2' style={{ paddingLeft: "15px", paddingRight: "15px" }}><i className="fa-regular fa-pen-to-square"></i></button>
        <button onClick={deleteHandle} style={{ paddingLeft: "15px", paddingRight: "15px" }}><i className="fa-regular fa-trash-can" onClick={() => {deleteController()}}></i></button>
      </td>
    </tr>
  )
}
