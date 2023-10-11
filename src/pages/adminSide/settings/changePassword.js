import React, { useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { Icons } from 'assets';
import { StyledGeneral } from './style';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from 'redux/profile/actions';
import { FieldErrorMessage, mainColor } from 'styles/global';
import CircularProgress from '@mui/material/CircularProgress';

const Index = () => {
    const dispatch = useDispatch()
    const { email } = useSelector((state) => (state.authReducers.adminSignIn.data))
    const { loading } = useSelector((state) => (state.profileReducers.changePassword))

    const initialValues = {
        newPassword: "",
        oldPassword: "",
        confirmNewPassword: "",
    }

    const PasswordInput = ({ label, name, width }) => {
        const [showPassword, setShowPassword] = useState(false)

        return (
            <Field name={name}>
                {({ field, form }) => (
                    <React.Fragment>
                        <TextFieldInput
                            reset="true"
                            width={width}
                            label={label}
                            autoComplete=""
                            field={{ ...field }}
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
                        <ErrorMessage name={name} component={FieldErrorMessage} />
                    </React.Fragment>
                )}
            </Field>
        )
    }

    const handleSubmit = (data) => {
        const newObj = {
            email,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        }
        dispatch(changePassword(newObj))
    }

    return (
        <StyledGeneral>
            <h2>Change password</h2>
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
                                <PasswordInput label='Current password' name='oldPassword' width="18%" />
                            </div>

                            <div className='new-confirm_password'>
                                <div className='match-password'>
                                    <PasswordInput label='New password' name='newPassword' width="31%" />
                                </div>
                                <div className='match-password'>
                                    <PasswordInput label='Confirm password' name='confirmNewPassword' width="39%" />
                                </div>
                            </div>

                            <div className='btn-container'>
                                <button type='button' className='cancel-btn'>Cancel</button>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='save-btn'
                                    style={{
                                        width: '119px',
                                        display: 'flex',
                                        color: '#FFFFFF',
                                        alignItems: 'center',
                                        background: mainColor,
                                        justifyContent: 'center',
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress
                                            size={22}
                                            color='inherit'
                                        />
                                    )
                                        : 'Save changes'
                                    }
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </StyledGeneral>
    )
}

export default Index
const validationSchema = Yup.object({
    oldPassword: Yup.string().required('This field is required'),
    newPassword: Yup.string()
        .required('This field is required')
        .min(8, 'Password must contain min 8 characters')
        .max(20, 'Password can have max 20 characters')
        .notOneOf([Yup.ref('oldPassword')], 'New password must be different from the current password')
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/, 'Password must contain at least one upper-case letter, one lower-case letter, one numeric character, and one special character'),
    confirmNewPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});