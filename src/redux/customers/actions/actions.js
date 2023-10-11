import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { CUSTOMERS_REQUEST, CUSTOMERS_SUCCESS, CUSTOMERS_FAIL, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, CUSTOMER_DETAILS_FAIL, CUSTOMER_BLOCK_UNBLOCK_REQUEST, CUSTOMER_BLOCK_UNBLOCK_SUCCESS, CUSTOMER_BLOCK_UNBLOCK_FAIL } from "../types";

const api = new ApiClient();

export const customersList = (data) => async (dispatch) => {
    dispatch({ type: CUSTOMERS_REQUEST })
    try {
        const response = await api.post('/user/all-customer', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: CUSTOMERS_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: CUSTOMERS_FAIL })
    }
}

export const customerDetails = (id) => async (dispatch) => {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST })
    try {
        const response = await api.get(`/user/customer/${id}`,)
        if (response.data.Succeeded) {
            dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: CUSTOMER_DETAILS_FAIL })
    }
}

export const customerBlockUnBlock = (id, data) => async (dispatch) => {
    dispatch({ type: CUSTOMER_BLOCK_UNBLOCK_REQUEST })
    try {
        const response = await api.put(`/user/block-unblock/${id}`, data)
        if (response.data.Succeeded) {
            dispatch({ type: CUSTOMER_BLOCK_UNBLOCK_SUCCESS, payload: response.data.message })
            if (data.block) {
                SweetAlert('success', 'Blocked', 'Customer has been blocked successfully')
                return
            }
            SweetAlert('success', 'Unblocked', 'Customer has been unblocked successfully')
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: CUSTOMER_BLOCK_UNBLOCK_FAIL })
    }
}