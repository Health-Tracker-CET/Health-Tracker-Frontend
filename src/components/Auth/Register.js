import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import './Register.css';
import '../Landing.css';
import { registerUser } from '../../utils/userActions';

const RegisterSchema = yup.object().shape({
    name : yup.string().required("*Name cannot be empty"),
    email: yup.string().email("*Not a valid email").required('*Email cannot be empty'),
    password: yup.string().required('*Password cannot be empty'),
    repass :yup.string().oneOf([yup.ref('password'), null], '*Passwords must match').required('*Field cannot be empty'),
});


export default function Register() {
    const history = useHistory();
    const handleRegister = (values) => {
        const {name, email, password} = values;
        registerUser(name, email, password)
        .then(message => {
            // Registered user successfully
            history.push('/login');
        })
        .catch(err => {
            console.log(err);
        })
    }


    return(
        <div className="login-page">
            
            <Formik
                validationSchema={RegisterSchema}
                initialValues={{ name : '', email: '', password: '', repass : '' }}
                onSubmit={(values, { setSubmitting }) => {
                    handleRegister(values);
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
                                <p>User Register</p>
                        </div>
                        <div className="input-container">
                            <input type="text" onChange={handleChange('name')} value={values.name} placeholder="Enter your name"/>
                            <span>{errors.name}</span>
                        </div>
                        <div className="input-container">
                            <input type="email" onChange={handleChange('email')} value={values.email} placeholder="Enter email address"/>
                            <span>{errors.email}</span>
                        </div>
                        <div className="input-container">
                            <input type="password" onChange={handleChange('password')} value={values.password} placeholder="Enter password"/>                            <span></span>
                            <span>{errors.password}</span>
                        </div> 
                        <div className="input-container">
                            <input type="password" onChange={handleChange('repass')} value={values.repass} placeholder="Re-enter your password"/>                            <span></span>
                            <span>{errors.repass}</span>
                        </div> 

                        
                        <div className="btn-container">
                            <button className="btn register" onClick={() => history.push('/login')}>Sign in</button>
                            <button className="btn submit" type="submit">Register</button>
                            
                            <button className="btn reset" onClick={() => resetForm()}>Reset</button>
                        </div>

                        
                    </form>

                )}

            </Formik>
        </div>
    )
}