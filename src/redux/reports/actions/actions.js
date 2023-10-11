import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { SELECTED_TAB, GET_REPORTS_REQUEST, GET_REPORTS_SUCCESS, GET_REPORTS_FAIL, REPLY_REPORT_REQUEST, REPLY_REPORT_FAIL, REPLY_REPORT_SUCCESS, CLOSE_REPORT_REQUEST, CLOSE_REPORT_SUCCESS, CLOSE_REPORT_FAIL } from "../types";

const api = new ApiClient();

export const setSelectedTab = (tabValue) => ({
    type: SELECTED_TAB,
    payload: tabValue,
})

//Reports Actions
export const reportsList = (data) => async (dispatch) => {
    dispatch({ type: GET_REPORTS_REQUEST })
    try {
        const response = await api.post('/support-query/get-all', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: GET_REPORTS_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: GET_REPORTS_FAIL })
    }
}

export const replyReport = (id, data) => async (dispatch) => {
    dispatch({ type: REPLY_REPORT_REQUEST })
    try {
        const response = await api.post(`/support-query/send-message/${id}`, data)
        if (response.data.Succeeded) {
            if (typeof (response.data.data) === 'string') {
                dispatch({ type: REPLY_REPORT_FAIL })
                SweetAlert('warning', 'Warning!', response.data.data)
                return
            }
            dispatch({ type: REPLY_REPORT_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: REPLY_REPORT_FAIL })
    }
}

export const closeReport = (id) => async (dispatch) => {
    dispatch({ type: CLOSE_REPORT_REQUEST })
    try {
        const response = await api.put(`/support-query/close-query/${id}`)
        if (response.data.Succeeded) {
            dispatch({ type: CLOSE_REPORT_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: CLOSE_REPORT_FAIL })
    }
}