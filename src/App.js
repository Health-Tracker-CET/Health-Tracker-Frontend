import React, { lazy, Suspense, useState } from 'react';
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
    <LoginContext.Provider value={{isLoggedIn, setLoggedIn}}>
      <Router forceRefresh>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Landing Page</Link>
              </li>
              <li>
                <Link to="/user">User Page</Link>
              </li>
              <li>
                <Link to="/doctor">Doctor Page</Link>
              </li>
              <li>
                <Link to="/login">Login Page</Link>
              </li>
              <li>
                <Link to="/register">Register Page</Link>
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
