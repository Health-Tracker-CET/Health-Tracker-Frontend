import React from 'react';
import './DoctorDash.css'

const patientList = [
    {
        name : 'Adityesh',
        email : 'adityesh@test.com',
        age : 22,
    },
    {
        name : 'Adityesh',
        email : 'adityesh@test.com',
        age : 22,
    },
    {
        name : 'Adityesh',
        email : 'adityesh@test.com',
        age : 22,
    },
    {
        name : 'Adityesh',
        email : 'adityesh@test.com',
        age : 22,
    }
]



export default function DoctorDash() {
    return(
        <div className="doctor-page">
            <div className="patients-container">
                <div className="patient-header">
                    <p>Patients</p>
                </div>
                <div className="patient-table-header">
                    <ul>
                        <span>
                            Name
                        </span>
                        <span>
                            Email
                        </span>
                        <span>
                            Age
                        </span>
                    </ul>
                </div>
                <div className="patient-list">
                    {patientList.map(patient => {
                        return (
                            <ul>
                                <span>
                                    {patient.name}
                                </span>
                                <span>
                                    {patient.email}
                                </span>
                                <span>
                                    {patient.age}
                                </span>
                            </ul>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}