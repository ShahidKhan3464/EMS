import React from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { useNavigate } from 'react-router-dom';
import { FieldErrorMessage } from 'styles/global';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { serviceProviderApproval } from 'redux/serviceProviders/actions';

const Index = ({ id, isDetailPage = null, setOpen, setPayload }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.serviceProvidersReducers.approval)

    const handleSubmit = async ({ profileRejectedReason }) => {
        const obj = { profileApprovedStatus: 'REJECTED', profileRejectedReason }
        await dispatch(serviceProviderApproval(id, obj))
        if (!isDetailPage) {
            setOpen(false)
            setPayload(prevData => ({ ...prevData }))
        }
        else {
            navigate("/requests")
        }
    }

    return (
        <Formik
            initialValues={{ profileRejectedReason: '' }}
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
                            <Field name="profileRejectedReason">
                                {({ field }) => (
                                    <div className='textarea'>
                                        <TextFieldInput
                                            type="text"
                                            width="20%"
                                            multiline={true}
                                            autoComplete=""
                                            field={{ ...field }}
                                            label="Cause of rejection"
                                            error={formik.errors.profileRejectedReason && formik.touched.profileRejectedReason}
                                        />
                                        <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                    </div>
                                )}
                            </Field>
                        </div>

                        <div className='btn-container'>
                            <button
                                type='button'
                                className='cancel-btn'
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='control-btn'
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        color='inherit'
                                    />
                                ) : (
                                    "Send"
                                )}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Index
const validationSchema = Yup.object({
    profileRejectedReason: Yup.string()
        .required('This field is required')
        .max(1500, 'Description can have max 1500 characters'),
});