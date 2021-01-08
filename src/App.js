import React, { lazy, Suspense, useState } from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LoginContext } from './context/context'
const LoginPage = lazy(() => import('./components/Auth/Login'));
const RegisterPage = lazy(() => import('./components/Auth/Register'));
const UserDash = lazy(() => import('./components/Dashboard/UserDash'));
const DoctorDash = lazy(() => import('./components/Dashboard/DoctorDash'));
const LandingPage = lazy(() => import('./components/Landing'));

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <Router forceRefresh>
        <div className="header">
          <nav className="nav-bar">
            <ul className="nav-links">
              <li>
                <Link to="/"><i className="fa fa-home" aria-hidden="true"></i><span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/user"><i className="fa fa-user-circle" aria-hidden="true"></i><span>User</span></Link>
              </li>
              <li>
                <Link to="/doctor"><i className="fa fa-stethoscope" aria-hidden="true"></i><span>Doctor</span></Link>
              </li>

            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/user">
                <UserDash />
              </Route>
              <Route path="/doctor">
                <DoctorDash />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route exact path="/">
                <LandingPage />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </LoginContext.Provider>
  );



}

export default App;
