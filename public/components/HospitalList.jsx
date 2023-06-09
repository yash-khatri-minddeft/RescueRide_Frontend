import React from 'react'

export default function HospitalList({hospital}) {
    return(
        <tr>
            <td>{hospital.address}</td>
            <td>{hospital.longitude.toFixed(7)}</td>
            <td>{hospital.latitude.toFixed(7)}</td>
        </tr>
    )
}