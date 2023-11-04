import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { TRANSACTIONS_REQUEST, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAIL, TRANSACTION_DETAILS_REQUEST, TRANSACTION_DETAILS_SUCCESS, TRANSACTION_DETAILS_FAIL, TRANSACTION_REVENUE_REQUEST, TRANSACTION_REVENUE_SUCCESS, TRANSACTION_REVENUE_FAIL } from "../types";

const api = new ApiClient();

export const transactionsList = (data) => async (dispatch) => {
    dispatch({ type: TRANSACTIONS_REQUEST })
    try {
        const response = await api.post('/transaction/get-all', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: TRANSACTIONS_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: TRANSACTIONS_FAIL })
    }
}

export const transactionDetails = (id) => async (dispatch) => {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST })
    try {
        const response = await api.get(`/transaction/${id}`)
        if (response.data.Succeeded) {
            dispatch({ type: TRANSACTION_DETAILS_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: TRANSACTION_DETAILS_FAIL })
    }
}

export const transactionRevenue = ({ successCallBack }) => async (dispatch) => {
    dispatch({ type: TRANSACTION_REVENUE_REQUEST })
    try {
        const response = await api.get(`/transaction/revenue`)
        if (response.data.Succeeded) {
            dispatch({ type: TRANSACTION_REVENUE_SUCCESS, payload: response.data.data })
            successCallBack()
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: TRANSACTION_REVENUE_FAIL })
    }
}