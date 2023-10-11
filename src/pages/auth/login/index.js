import React, { useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { Icons } from 'assets';
import { Link } from 'react-router-dom';
import StyledAuthBox from 'components/authBox';
import { adminSignIn } from 'redux/auth/actions';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryButton, FieldErrorMessage } from 'styles/global';

const Index = () => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const { loading } = useSelector((state) => state.authReducers.adminSignIn)

    const initialValues = {
        email: "",
        password: ""
    }

    const suffix = (name, formik) => {
        return (
            <button
                type='button'
                onClick={() => formik.setFieldValue(name, "")}
                style={{
                    top: '16px',
                    padding: '0',
                    right: '8px',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    position: 'absolute',
                    background: 'transparent'
                }}
            >
                <img src={Icons.clear} alt='clear-icon' />
            </button>
        )
    }

    return (
        <StyledAuthBox>
            <div className='text'>
                <h3>Admin login</h3>
                <p>Welcome back. Enter your credentials to access your account</p>
            </div>
            <div className='form-container'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(data) => dispatch(adminSignIn(data))}
                >
                    {(formik) => {
                        return (
                            <Form
                                noValidate
                                name='basic'
                                autoComplete='off'
                                onFinish={formik.handleSubmit}
                            >
                                <div className='field-control'>
                                    <Field name="email">
                                        {({ field }) => (
                                            <React.Fragment>
                                                <TextFieldInput
                                                    label=""
                                                    width="0%"
                                                    type="email"
                                                    mbwidth="0%"
                                                    field={{ ...field }}
                                                    placeholder='Enter Email'
                                                    autoComplete="current-password"
                                                    error={formik.errors.email && formik.touched.email}
                                                />
                                                {field.value && suffix(field.name, formik)}
                                                <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                            </React.Fragment>
                                        )}
                                    </Field>
                                </div>

                                <div className='field-control'>
                                    <Field name="password">
                                        {({ field }) => (
                                            <React.Fragment>
                                                <TextFieldInput
                                                    label=""
                                                    width="0%"
                                                    mbwidth="0%"
                                                    field={{ ...field }}
                                                    placeholder='Enter Password'
                                                    autoComplete="current-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    error={formik.errors.password && formik.touched.password}
                                                />
                                                {field.value && !formik.errors.password && (
                                                    <button
                                                        type='button'
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        style={{
                                                            top: '16px',
                                                            padding: '0',
                                                            right: '8px',
                                                            border: 'none',
                                                            outline: 'none',
                                                            cursor: 'pointer',
                                                            position: 'absolute',
                                                            background: 'transparent'
                                                        }}
                                                    >
                                                        <img src={Icons.passwordToggle} alt='toggle' />
                                                    </button>
                                                )}
                                                <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                            </React.Fragment>
                                        )}
                                    </Field>
                                </div>

                                <div className='forgot-password'>
                                    <Link to="/forgot-password">Forgot password?</Link>
                                </div>

                                <div className="btn-container">
                                    <PrimaryButton
                                        type='submit'
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <CircularProgress
                                                size={22}
                                                color='inherit'
                                            />
                                        ) : (
                                            <span>Login</span>
                                        )}
                                    </PrimaryButton>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </StyledAuthBox>
    )
}

export default Index
const validationSchema = Yup.object({
    email: Yup.string()
        .required('This field is required')
        .email('Invalid email address'),
    password: Yup.string()
        // .min(8, 'Invalid password')
        .max(20, 'Invalid password')
        .required('This field is required')
});