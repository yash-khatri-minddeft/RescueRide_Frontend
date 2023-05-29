import React from 'react'

export default function ControllerList({controller}) {
  return (
    <tr>
      <td>{controller.name}</td>
      <td><a href={`mailto:${controller.email}`}>{controller.email}</a></td>
      <td>{controller.gender}</td>
      <td><a href={`tel:${controller.phoneNo}`}>{controller.phoneNo}</a></td>
    </tr>
  )
}
