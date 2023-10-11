import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { StyledEmailUpdate } from './style';
import { FieldErrorMessage } from "styles/global";
import TextFieldInput from 'components/inputField';
import { changeEmail } from 'redux/profile/actions';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const Index = ({ setDialogOpen }) => {
    const dispatch = useDispatch()
    const [apiHitted, setApiHitted] = useState(false)
    const { loading, message } = useSelector((state) => state.profileReducers.changeEmail)

    const initialValues = {
        newEmail: "",
        confirmEmail: ""
    }

    const handleSubmit = async (data) => {
        const obj = { email: data.newEmail }
        await dispatch(changeEmail(obj))
        setApiHitted(true)
    }

    useEffect(() => {
        if (apiHitted) {
            if (message === "Successful") {
                setApiHitted(false)
                setDialogOpen(false)
            }
        }
    }, [apiHitted, message, setDialogOpen])

    return (
        <StyledEmailUpdate>
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
                            <div
                                className='field-control'
                                style={{ position: 'relative' }}
                            >
                                <Field name="newEmail">
                                    {({ field }) => (
                                        <React.Fragment>
                                            <TextFieldInput
                                                width="13%"
                                                type="email"
                                                label="Email"
                                                autoComplete=""
                                                field={{ ...field }}
                                                error={formik.errors.newEmail && formik.touched.newEmail}
                                            />
                                            <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                        </React.Fragment>
                                    )}
                                </Field>
                            </div>

                            <div
                                className='field-control'
                                style={{ position: 'relative' }}
                            >
                                <Field name="confirmEmail">
                                    {({ field }) => (
                                        <React.Fragment>
                                            <TextFieldInput
                                                width="28%"
                                                type="email"
                                                autoComplete=""
                                                field={{ ...field }}
                                                label="Confirm email"
                                                error={formik.errors.confirmEmail && formik.touched.confirmEmail}
                                            />
                                            <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                        </React.Fragment>
                                    )}
                                </Field>
                            </div>

                            <button
                                type='submit'
                                className='update-btn'
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        color='inherit'
                                    />
                                )
                                    : 'Done'
                                }
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </StyledEmailUpdate>
    )
}

export default Index
const validationSchema = Yup.object({
    newEmail: Yup.string()
        .email('Invalid email address')
        .required('This field is required')
        .test('valid-domain', 'Invalid email address', (value) => {
            if (!value) return false
            const domain = value.split('@')[1]
            return domain && domain.includes('.')
        }),
    confirmEmail: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('newEmail'), null], 'Emails must match')
});