import React from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from 'redux/auth/actions';
import StyledAuthBox from 'components/authBox';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryButton, FieldErrorMessage } from 'styles/global';

const Index = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.authReducers.verifyOtp)
    const email = location.state

    const moveRouter = () => { navigate("/reset-password", { state: email }) }

    const handleSubmit = (data) => {
        data.email = email
        dispatch(verifyOtp(data, moveRouter))
    }

    return (
        <StyledAuthBox>
            <div className='text'>
                <h3>Verification</h3>
                <p>Please enter verification code sent to email example@gmail.com</p>
            </div>
            <div className='form-container'>
                <Formik
                    initialValues={{ otp: "" }}
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
                                    <Field name="otp">
                                        {({ field }) => (
                                            <React.Fragment>
                                                <TextFieldInput
                                                    width="22%"
                                                    type="number"
                                                    mbwidth="26%"
                                                    label="Enter code"
                                                    field={{ ...field }}
                                                    error={formik.errors.otp && formik.touched.otp}
                                                />
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
                                            <span>Verify</span>
                                        )}
                                    </PrimaryButton>

                                    <PrimaryButton
                                        type='button'
                                        className='bottom-btn'
                                    >
                                        Resend code
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
    otp: Yup.number()
        .required('This field is required')
});