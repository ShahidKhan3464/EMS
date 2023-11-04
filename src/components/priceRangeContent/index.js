import React from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { StyledPriceRangeContent } from './style';
import TextFieldInput from 'components/inputField';
import { Formik, Field, ErrorMessage } from "formik";
import { PrimaryButton, FieldErrorMessage } from 'styles/global';

const Index = ({ setPriceRange }) => {

    const initialValues = {
        from: "",
        to: ""
    }

    return (
        <StyledPriceRangeContent>
            <h3 className='title'>Select price range</h3>
            <div className='form-container'>
                <Formik
                    onSubmit={setPriceRange}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {(formik) => {
                        return (
                            <Form
                                noValidate
                                name='basic'
                                autoComplete='off'
                                onFinish={formik.handleSubmit}
                            >
                                <div className='flex-wrap'>
                                    <div className='field-control'>
                                        <Field name="from">
                                            {({ field }) => (
                                                <React.Fragment>
                                                    <TextFieldInput
                                                        label=""
                                                        width="0%"
                                                        mbwidth="0%"
                                                        type="number"
                                                        placeholder='From'
                                                        field={{ ...field }}
                                                        error={formik.errors.from && formik.touched.from}
                                                    />
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>

                                    <div className='field-control'>
                                        <Field name="to">
                                            {({ field }) => (
                                                <React.Fragment>
                                                    <TextFieldInput
                                                        label=""
                                                        width="0%"
                                                        mbwidth="0%"
                                                        type='number'
                                                        placeholder='To'
                                                        field={{ ...field }}
                                                        error={formik.errors.to && formik.touched.to}
                                                    />
                                                    <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                                </React.Fragment>
                                            )}
                                        </Field>
                                    </div>
                                </div>

                                <div className="btn-container">
                                    <PrimaryButton
                                        type='submit'
                                    >
                                        Apply
                                    </PrimaryButton>

                                    <button
                                        type='button'
                                        className='cancel-btn'
                                        onClick={() => setPriceRange()}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </StyledPriceRangeContent>
    )
}

export default Index
const validationSchema = Yup.object({
    from: Yup.string()
        .required('This field is required'),
    to: Yup.string()
        .required('This field is required')
        .test('is-greater-than-from', 'To must be greater than From', function (to) {
            const { from } = this.parent
            if (from && to) {
                return parseFloat(to) > parseFloat(from)
            }
            return true
        }),
});