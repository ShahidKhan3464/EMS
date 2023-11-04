import React from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { Icons } from 'assets';
import { useNavigate } from 'react-router-dom';
import StyledAuthBox from 'components/authBox';
import TextFieldInput from 'components/inputField';
import { forgotPassword } from 'redux/auth/actions';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryButton, FieldErrorMessage } from 'styles/global';

const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.authReducers.forgotPassword)

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

    const moveRouter = (email) => { navigate("/verification", { state: email }) }

    const handleSubmit = (data) => {
        dispatch(forgotPassword(data, moveRouter))
    }

    return (
        <StyledAuthBox>
            <div className='text'>
                <h3>Forgot password</h3>
                <p>Enter the email of your account and we will send the verification code to reset your password.</p>
            </div>
            <div className='form-container'>
                <Formik
                    initialValues={{ email: "" }}
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
                                    <Field name="email">
                                        {({ field }) => (
                                            <React.Fragment>
                                                <TextFieldInput
                                                    width="12%"
                                                    type="email"
                                                    mbwidth="15%"
                                                    label="Email"
                                                    field={{ ...field }}
                                                    autoComplete="current-password"
                                                    error={formik.errors.email && formik.touched.email}
                                                />
                                                {field.value && suffix(field.name, formik)}
                                                <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                            </React.Fragment>
                                        )}
                                    </Field>
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
                                            <span>Continue</span>
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
    email: Yup.string()
        .required('This field is required')
        .email('Invalid email address'),
});