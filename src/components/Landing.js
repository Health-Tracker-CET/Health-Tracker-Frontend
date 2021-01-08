import React from 'react';
import { useHistory } from 'react-router-dom';
import './Landing.css';
export default function Landing() {
    const history = useHistory();
    return(
        <>
        
        <div className="landing-page">
            
            <div className="left-container">
                <h1>Heath Tracker <i className="fa fa-medkit" aria-hidden="false"></i></h1>
                <div className="login-container">
                    <p>Log in to your account</p> 
                    <a className="horizontal"  onClick={() => history.push('/login')}><span className="text">Login</span></a>
                </div>
                <div className="or-container">
                    <p>or</p>
                </div>
                
                 <div className="register-container">
                 <p>Sign up for an account</p>
                 <a className="horizontal" onClick={() => history.push('/register')}><span className="text">Sign Up</span></a>
                 </div>
            </div>
            <div className="right-container">
                <h3>Landing Page for Health Tracker</h3>
            </div>
            
        </div>
        </>
    ) 
}