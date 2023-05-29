import React from 'react'

export default function HospitalList({hospital}) {
    return(
        <tr>
            <td>{hospital.name}</td>
            <td>{hospital.longitude}</td>
            <td>{hospital.latitude}</td>
        </tr>
    )
}