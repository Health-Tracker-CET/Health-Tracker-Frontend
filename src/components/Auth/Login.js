import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/context';
const LoginSchema = yup.object().shape({
    email: yup.string().email("Not a valid email").required('Email cannot be empty'),
    password: yup.string().required('Password cannot be empty'),
});

export default function Login() {
    const history = useHistory();
    const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
    const handleLogin = (values) => {

        setLoggedIn(true);
        history.push('/user');
    }

    return (
        
                <div>
                <h3>Login Page for user</h3>
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

                        <form onSubmit={handleSubmit}>
                            <div>
                                <input type="email" onChange={handleChange('email')} value={values.email} placeholder="Enter email address" />
                                <span>{errors.email}</span>
                            </div>
                            <div>
                                <input type="password" onChange={handleChange('password')} value={values.password} placeholder="Enter password" />                            <span></span>
                                <span>{errors.password}</span>
                            </div>

                            <div>
                                <button type="submit">Login</button>
                                <button onClick={() => history.push('/register')}>Sign up</button>
                                <button onClick={() => resetForm()}>Reset</button>
                            </div>


                        </form>

                    )}

                </Formik>
            </div>
            
    )
}