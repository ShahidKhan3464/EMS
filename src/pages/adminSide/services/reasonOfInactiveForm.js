import React from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { FieldErrorMessage } from 'styles/global';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { changeServiceStatus } from 'redux/services/actions';
import CircularProgress from '@mui/material/CircularProgress';

const Index = ({ id, setPayload, setOpen }) => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.servicesReducers.changeStatus)

    const handleSubmit = async ({ serviceInactiveReason }) => {
        const obj = { status: "INACTIVE", serviceInactiveReason }
        await dispatch(changeServiceStatus(id, obj))
        setPayload(prevData => ({ ...prevData }))
        setOpen(false)
    }

    return (
        <Formik
            initialValues={{ serviceInactiveReason: '' }}
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
                            <Field name="serviceInactiveReason">
                                {({ field }) => (
                                    <div className='textarea'>
                                        <TextFieldInput
                                            type="text"
                                            width="20%"
                                            autoComplete=""
                                            multiline={true}
                                            field={{ ...field }}
                                            label="Reason of inactive"
                                            error={formik.errors.serviceInactiveReason && formik.touched.serviceInactiveReason}
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
                                disabled={!formik.isValid}
                                className={`control-btn ${!formik.isValid ? 'disabled-btn' : ''}`}
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
    serviceInactiveReason: Yup.string()
        .required('This field is required')
        .max(1500, 'Description can have max 1500 characters'),
});