import React, { useState } from 'react';
import * as Yup from "yup";
import { Form } from "antd";
import { capitalizeFirstLetter } from 'utils';
import { StyledPriceGuideForm } from './style';
import { FieldErrorMessage } from 'styles/global';
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { priceGuideList, priceGuideUpdate } from 'redux/priceGuide/actions';
import { CircularProgress, FormControl, MenuItem, Select } from '@mui/material';

const Index = ({ data, setDialogOpen }) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('Percentage')
    const { loading } = useSelector((state) => state.priceGuideReducers.update)

    const handleSubmit = async ({ actualFee }) => {
        const { category, subCategory, id } = data
        const obj = {
            category,
            subCategory,
            actualFee: parseInt(actualFee),
            typeOfFee: value.toUpperCase()
        }
        await dispatch(priceGuideUpdate(id, obj))
        setDialogOpen(false)
        dispatch(priceGuideList())
    }

    return (
        <StyledPriceGuideForm>
            <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={{ actualFee: `${data.actualFee}%` }}
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
                                <label className='disabled-label'>1. Category</label>
                                <Field name="disabled">
                                    {({ field }) => (
                                        <input
                                            disabled
                                            {...field}
                                            type='text'
                                            className='disabled-field'
                                            placeholder={capitalizeFirstLetter(data.category)}
                                        />
                                    )}
                                </Field>
                            </div>

                            <div className='field-control'>
                                <label className='disabled-label'>2. Sub category</label>
                                <Field name="disabled">
                                    {({ field }) => (
                                        <input
                                            disabled
                                            {...field}
                                            type='text'
                                            className='disabled-field'
                                            placeholder={capitalizeFirstLetter(data.subCategory.replace(/_/g, " "))}
                                        />
                                    )}
                                </Field>
                            </div>

                            <div className='field-control'>
                                <label className='enabled-label'>3. Type of fee</label>
                                <Field name="fee">
                                    {({ field }) => (
                                        <FormControl
                                            fullWidth
                                            sx={{
                                                maxWidth: '238px',
                                                '& fieldset': {
                                                    border: '2px solid #919292 !important',
                                                },
                                                '&:hover fieldset': {
                                                    border: '2px solid #919292 !important',
                                                },
                                                '& fieldset legend': {
                                                    width: '0%',
                                                    border: 'none'
                                                },
                                            }}
                                        >
                                            <Select
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                                sx={{
                                                    width: '100%',
                                                    fontWeight: 400,
                                                    color: '#919292',
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    fontStyle: 'normal',
                                                    fontFamily: 'Poppins',
                                                    letterSpacing: '0.5px',
                                                }}
                                            >
                                                <MenuItem value="Percentage">Percentage</MenuItem>
                                                <MenuItem value="Fixed">Fixed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                            </div>

                            <div className='field-control'>
                                <label className='enabled-label'>4. Actual fee</label>
                                <Field name="actualFee">
                                    {({ field }) => (
                                        <React.Fragment>
                                            <input
                                                {...field}
                                                type='text'
                                            />
                                            <ErrorMessage name={field.name} component={FieldErrorMessage} />
                                        </React.Fragment>
                                    )}
                                </Field>
                            </div>

                            <div className='btn-container'>
                                <button
                                    type='button'
                                    className='cancel-btn'
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='save-btn'
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
        </StyledPriceGuideForm>
    )
}

export default Index
const validationSchema = Yup.object({
    actualFee: Yup.string()
        .required('This field is required')
        .test('is-number', 'This field should contain a number', value => {
            if (!value) {
                return true
            }
            return !isNaN(parseFloat(value)) && isFinite(value)
        })
});