import React from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { FieldErrorMessage } from 'styles/global';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { serviceProviderBlockUnBlock, serviceProviderDetails } from 'redux/serviceProviders/actions';

const Index = ({ id, isDetailPage = null, setOpen, setPayload }) => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.serviceProvidersReducers.blockUnblock)
    const { list } = useSelector((state) => state.serviceProvidersReducers.bookingDetails.data)

    const handleSubmit = async ({ reasonOfBlock }) => {
        const obj = { block: true, reasonOfBlock, isRefundAll: !!list.length }
        await dispatch(serviceProviderBlockUnBlock(id, obj))
        if (!isDetailPage) {
            setOpen(false)
            setPayload(prevData => ({ ...prevData }))
            return
        }
        setOpen(false)
        dispatch(serviceProviderDetails(id))
    }

    return (
        <Formik
            initialValues={{ reasonOfBlock: '' }}
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
                            <Field name="reasonOfBlock">
                                {({ field }) => (
                                    <div className='textarea'>
                                        <TextFieldInput
                                            type="text"
                                            width="21%"
                                            autoComplete=""
                                            multiline={true}
                                            field={{ ...field }}
                                            label="Reason of blocking"
                                            error={formik.errors.reasonOfBlock && formik.touched.reasonOfBlock}
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
    reasonOfBlock: Yup.string()
        .required('This field is required')
        .max(1500, 'Description can have max 1500 characters'),
});