import React, { useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { useDispatch } from 'react-redux';
import { FieldErrorMessage } from 'styles/global';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { addFaq, updateFaq } from 'redux/help/actions';
import CircularProgress from '@mui/material/CircularProgress';

const Index = ({ id = null, faqs = null, value = null, dialogType, setOpen, setPayload }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const filterFaqs = faqs?.find(faq => faq.id === id)
    const [isFormDirty, setIsFormDirty] = useState(false)

    const initialValues = {
        topic: filterFaqs?.topic ?? "",
        description: filterFaqs?.description ?? "",
    }

    const handleSubmit = async (data) => {
        const userType = {
            0: 'CUSTOMER',
            1: 'SERVICE_PROVIDER',
        }
        data.userType = userType[value]

        if (id) {
            setLoading(true)
            await dispatch(updateFaq(id, data))
            setOpen(false)
            setLoading(false)
            setPayload(prevData => ({ ...prevData }))
        }

        else {
            setLoading(true)
            await dispatch(addFaq(data))
            setOpen(false)
            setLoading(false)
            setPayload(prevData => ({
                ...prevData,
                page: 1,
                pageSize: 5
            }))
        }
    }

    return (
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
                            <Field name="topic">
                                {({ field }) => (
                                    <React.Fragment>
                                        <TextFieldInput
                                            type="text"
                                            width="10.5%"
                                            mbWidth="27%"
                                            shrink={true}
                                            autoComplete=""
                                            label="Question"
                                            field={{ ...field }}
                                            onKeyUp={() => setIsFormDirty(true)}
                                            placeholder="Enter your question here?"
                                            error={formik.errors.topic && formik.touched.topic}
                                        />
                                        <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                    </React.Fragment>
                                )}
                            </Field>
                        </div>

                        <div className='field-control'>
                            <Field name="description">
                                {({ field }) => (
                                    <div className='textarea'>
                                        <TextFieldInput
                                            type="text"
                                            width="13%"
                                            mbWidth="34%"
                                            shrink={true}
                                            autoComplete=""
                                            multiline={true}
                                            label="Description"
                                            field={{ ...field }}
                                            onKeyUp={() => setIsFormDirty(true)}
                                            placeholder='Enter your description here'
                                            error={formik.errors.description && formik.touched.description}
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
                                disabled={(dialogType === 'edit' || dialogType === 'add') && (!formik.dirty || !formik.isValid) && !isFormDirty}
                                className={`control-btn ${(dialogType === 'edit' || dialogType === 'add') && (!formik.dirty || !formik.isValid) && !isFormDirty ? 'disabled-btn' : ''}`}
                                style={{
                                    ...(loading && {
                                        width: '80px',
                                        height: '40px'
                                    })
                                }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        color='inherit'
                                    />
                                ) : (
                                    dialogType === 'add' ? 'Publish' : dialogType === 'edit' && 'Save'
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
    topic: Yup.string()
        .required('This field is required')
        .max(500, 'Question can have max 500 characters'),
    description: Yup.string()
        .required('This field is required')
        .max(2000, 'Description can have max 2000 characters'),
});