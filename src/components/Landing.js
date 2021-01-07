import React from 'react';
import { useHistory } from 'react-router-dom';
export default function Landing() {
    const history = useHistory();
    return(
        <div>
            <h3>Landing Page for Health Tracker</h3>
            <button onClick={() => history.push('/login')}>
                Login Page
            </button>
            <button onClick={() => history.push('/register')}>
                Register Page
            </button>
        </div>
    ) 
}