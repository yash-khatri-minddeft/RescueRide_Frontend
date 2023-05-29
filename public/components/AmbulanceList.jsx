import React from 'react'

export default function AmbulanceList({ambulance}) {
    return(
        <tr>
            <td>{ambulance.AmbulanceNumber}</td>
            <td>{ambulance.Status}</td>
            <td>{ambulance.type}</td>
            <td>{ambulance.driverName}</td>
            <td>{ambulance.driveNo}</td>
            <td>{ambulance.driverEmail}</td>
        </tr>
    )
}