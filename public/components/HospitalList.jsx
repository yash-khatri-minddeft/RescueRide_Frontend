import React from 'react'

export default function HospitalList({hospital}) {
    return(
        <tr>
            <td>{hospital.address}</td>
            <td>{hospital.longitude}</td>
            <td>{hospital.latitude}</td>
        </tr>
    )
}