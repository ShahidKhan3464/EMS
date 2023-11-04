import React, { useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { Icons } from 'assets';
import StyledAuthBox from 'components/authBox';
import TextFieldInput from 'components/inputField';
import { resetPassword } from 'redux/auth/actions';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryButton, FieldErrorMessage } from 'styles/global';

const Index = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.authReducers.resetPassword)
    const email = location.state

    const initialValues = {
        newPassword: "",
        confirmPassword: ""
    }

    const PasswordInput = ({ label, name, width, mbwidth }) => {
        const [showPassword, setShowPassword] = useState(false)
        return (
            <Field name={name}>
                {({ field, form }) => (
                    <React.Fragment>
                        <TextFieldInput
                            width={width}
                            label={label}
                            mbwidth={mbwidth}
                            field={{ ...field }}
                            autoComplete="new-password"
                            type={showPassword ? 'text' : 'password'}
                            error={form.errors[name] && form.touched[name]}
                        />
                        {field.value && (
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
                        <ErrorMessage name={name} component={FieldErrorMessage} />
                    </React.Fragment>
                )}
            </Field>
        )
    }

    const moveRouter = () => { navigate("/") }

    const handleSubmit = async (data) => {
        data.email = email
        data.password = data.newPassword
        dispatch(resetPassword(data, moveRouter))
    }

    return (
        <StyledAuthBox>
            <div className='text'>
                <h3>Reset password</h3>
                <p>Create a new password for your account</p>
            </div>
            <div className='form-container'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
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
                                    <PasswordInput label='New password' name='newPassword' width="28%" mbwidth="34%" />
                                </div>

                                <div className='field-control' style={{ marginTop: '45px' }}>
                                    <PasswordInput label='Confirm password' name='confirmPassword' width="35%" mbwidth="41%" />
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
                                            <span>Save</span>
                                        )}
                                    </PrimaryButton>

                                    <PrimaryButton
                                        type='button'
                                        className='bottom-btn'
                                        onClick={() => navigate("/")}
                                    >
                                        Back to login
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
    newPassword: Yup.string()
        .required('This field is required')
        .min(8, 'Password must contain min 8 characters')
        .max(20, 'Password can have max 20 characters')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/, 'Password must contain at least one upper-case letter, one lower-case letter, one numeric character, and one special character'),
    confirmPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});