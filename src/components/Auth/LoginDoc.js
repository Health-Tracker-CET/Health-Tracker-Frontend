import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/context';
import { loginUser } from '../../utils/userActions';
import './Login.css';
import '../Landing.css';

const LoginSchema = yup.object().shape({
    email: yup.string().email("*Not a valid email").required('*Email cannot be empty'),
    password: yup.string().required('*Password cannot be empty'),
});

export default function LoginDoc() {
    const history = useHistory();
    const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
    
    const handleLogin = (values) => {
        const {email, password} = values;
        console.log(values);
    }

    return (
        
                <div className="login-page">
                
                <Formik
                    validationSchema={LoginSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        handleLogin(values);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        resetForm
                    }) => (

                        <form onSubmit={handleSubmit} className="form-container">
                            <div className="head-container">
                                <p>Doctor Login</p>
                            </div>
                            <div className="input-container">
                                <input type="email" onChange={handleChange('email')} value={values.email} placeholder="Enter email address" />
                                <span>{errors.email}</span>
                            </div>
                            <div className="input-container">
                                <input type="password" onChange={handleChange('password')} value={values.password} placeholder="Enter password" />                            <span></span>
                                <span>{errors.password}</span>
                            </div>

                            <div className="btn-container">
                                
                                <button className="btn register" onClick={() => history.push('/doc-register')}>Sign up</button>
                                <button className="btn submit" type="submit">Login</button>
                                <button className="btn reset" onClick={() => resetForm()}>Reset</button>
                            </div>


                        </form>

                    )}

                </Formik>
            </div>
            
    )
}