import React from 'react'
import { Link } from 'react-router-dom'

export default function AmbulanceList({ ambulance }) {
	return (
		<tr>
			<td>{ambulance.AmbulanceNumber}</td>
			<td>{ambulance.Status}</td>
			<td>{ambulance.type}</td>
			<td>{ambulance.driverName}</td>
			<td>{ambulance.driveNo}</td>
			<td>{ambulance.driverEmail}</td>
			<td className='text-center'><Link to={`/ambulance-route/${ambulance._id}`} className='button route-link'><i className="fa-solid fa-route"></i></Link></td>
		</tr>
	)
}