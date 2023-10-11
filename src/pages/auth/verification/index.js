import React, { useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { useNavigate } from 'react-router-dom';
import StyledAuthBox from 'components/authBox';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import { PrimaryButton, FieldErrorMessage } from 'styles/global';

const Index = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (data) => {
        try {

        }
        catch (error) {

        }
    }

    return (
        <StyledAuthBox>
            <div className='text'>
                <h3>Verification</h3>
                <p>Please enter verification code sent to email example@gmail.com</p>
            </div>
            <div className='form-container'>
                <Formik
                    initialValues={{ code: "" }}
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
                                    <Field name="code">
                                        {({ field }) => (
                                            <React.Fragment>
                                                <TextFieldInput
                                                    width="22%"
                                                    type="number"
                                                    mbwidth="26%"
                                                    label="Enter code"
                                                    field={{ ...field }}
                                                    error={formik.errors.code && formik.touched.code}
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
    code: Yup.number()
        .required('This field is required')
});