import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { Icons } from 'assets';
import { StyledEmailUpdate } from './style';
import { FieldErrorMessage } from "styles/global";
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { verifyPassword } from 'redux/profile/actions';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const Index = ({ setDialogOpen, setDialogType }) => {
    const dispatch = useDispatch()
    const [apiHitted, setApiHitted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { loading, message } = useSelector((state) => state.profileReducers.verifyPassword)

    const handleSubmit = async (data) => {
        await dispatch(verifyPassword(data))
        setApiHitted(true)
    }

    useEffect(() => {
        if (apiHitted) {
            if (message === "Successful") {
                setDialogType('email')
                return
            }
            setDialogOpen(false)
        }
    }, [apiHitted, message, setDialogOpen, setDialogType])

    return (
        <StyledEmailUpdate>
            <Formik
                initialValues={{ password: "" }}
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
                                <Field name="password">
                                    {({ field }) => (
                                        <React.Fragment>
                                            <TextFieldInput
                                                width="34%"
                                                autoComplete=""
                                                field={{ ...field }}
                                                label="Current password"
                                                type={showPassword ? 'text' : 'password'}
                                                error={formik.errors.password && formik.touched.password}
                                            />
                                            {field.value && (
                                                <button
                                                    type='button'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{
                                                        top: '16px',
                                                        padding: '0',
                                                        right: '16px',
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
    password: Yup.string().required('This field is required')
});