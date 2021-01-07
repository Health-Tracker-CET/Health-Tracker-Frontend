import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const RegisterSchema = yup.object().shape({
    name : yup.string().required("Name cannot be empty"),
    email: yup.string().email("Not a valid email").required('Email cannot be empty'),
    password: yup.string().required('Password cannot be empty'),
    repass :yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Field cannot be empty'),
});


export default function Register() {
    const history = useHistory();
    const handleRegister = (values) => {
        console.log(values);
    }


    return(
        <div>
            <h3>Register Page for user</h3>
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

                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" onChange={handleChange('name')} value={values.name} placeholder="Enter your name"/>
                            <span>{errors.name}</span>
                        </div>
                        <div>
                            <input type="email" onChange={handleChange('email')} value={values.email} placeholder="Enter email address"/>
                            <span>{errors.email}</span>
                        </div>
                        <div>
                            <input type="password" onChange={handleChange('password')} value={values.password} placeholder="Enter password"/>                            <span></span>
                            <span>{errors.password}</span>
                        </div> 
                        <div>
                            <input type="password" onChange={handleChange('repass')} value={values.repass} placeholder="Re-enter your password"/>                            <span></span>
                            <span>{errors.repass}</span>
                        </div> 

                        
                        <div>
                            <button type="submit">Register</button>
                            <button onClick={() => history.push('/login')}>Sign in</button>
                            <button onClick={() => resetForm()}>Reset</button>
                        </div>

                        
                    </form>

                )}

            </Formik>
        </div>
    )
}