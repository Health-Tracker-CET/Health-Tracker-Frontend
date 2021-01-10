import React, {useEffect, useState} from 'react';
import './DoctorDash.css'
import { getUsers } from '../../utils/userActions';

export default function DoctorDash() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUserList();
    }, []);

    function getUserList() {
        getUsers(null, null)
        .then((value) => {
            setUsers(value)
        })
        .catch((err) => {
            console.log(err);
        })
    }

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
                    {users ? users.map((patient, index) => {
                        return (
                            <ul key={index}>
                                <span>
                                    {patient.name}
                                </span>
                                <span>
                                    {patient.email}
                                </span>
                                <span>
                                    {patient.age || index}
                                </span>
                            </ul>
                        )
                    }) : null}
                </div>
            </div>

        </div>
    )
}