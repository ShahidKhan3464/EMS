import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { SELECTED_TAB, GET_FAQS_REQUEST, GET_FAQS_SUCCESS, GET_FAQS_FAIL, ADD_FAQ_REQUEST, ADD_FAQ_SUCCESS, ADD_FAQ_FAIL, UPDATE_FAQ_REQUEST, UPDATE_FAQ_SUCCESS, UPDATE_FAQ_FAIL, DELETE_FAQ_REQUEST, DELETE_FAQ_SUCCESS, DELETE_FAQ_FAIL, GET_QUERIES_REQUEST, GET_QUERIES_SUCCESS, GET_QUERIES_FAIL, REPLY_QUERY_REQUEST, REPLY_QUERY_SUCCESS, REPLY_QUERY_FAIL, CLOSE_QUERY_REQUEST, CLOSE_QUERY_SUCCESS, CLOSE_QUERY_FAIL } from "../types";

const api = new ApiClient();

export const setSelectedTab = (tabValue) => ({
    type: SELECTED_TAB,
    payload: tabValue,
})

//Faq Actions
export const faqsList = (data) => async (dispatch) => {
    dispatch({ type: GET_FAQS_REQUEST })
    try {
        const response = await api.post('/faqs/get-all', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: GET_FAQS_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: GET_FAQS_FAIL })
    }
}

export const addFaq = (data) => async (dispatch) => {
    dispatch({ type: ADD_FAQ_REQUEST })
    try {
        const response = await api.post('/faqs', data)
        if (response.data.Succeeded) {
            dispatch({ type: ADD_FAQ_SUCCESS, payload: response.data.message })
            SweetAlert('success', 'Success', 'FAQ added successfully')
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', "Usertype is required")
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: ADD_FAQ_FAIL })
    }
}

export const updateFaq = (id, data) => async (dispatch) => {
    dispatch({ type: UPDATE_FAQ_REQUEST })
    try {
        const response = await api.put(`/faqs/${id}`, data)
        if (response.data.Succeeded) {
            dispatch({ type: UPDATE_FAQ_SUCCESS, payload: response.data.message })
            SweetAlert('success', 'Success', 'FAQ updated successfully')
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', "Usertype is required")
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: UPDATE_FAQ_FAIL })
    }
}

export const deleteFaq = (id, data) => async (dispatch) => {
    dispatch({ type: DELETE_FAQ_REQUEST })
    try {
        const response = await api.delete(`/faqs/${id}`, data)
        if (response.data.Succeeded) {
            dispatch({ type: DELETE_FAQ_SUCCESS, payload: response.data.message })
            SweetAlert('success', 'Success', 'FAQ deleted successfully')
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', "Usertype is required")
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: DELETE_FAQ_FAIL })
    }
}

//Queries Actions
export const queriesList = (data) => async (dispatch) => {
    dispatch({ type: GET_QUERIES_REQUEST })
    try {
        const response = await api.post('/support-query/get-all', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: GET_QUERIES_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: GET_QUERIES_FAIL })
    }
}

export const replyQuery = (id, data) => async (dispatch) => {
    dispatch({ type: REPLY_QUERY_REQUEST })
    try {
        const response = await api.post(`/support-query/send-message/${id}`, data)
        if (response.data.Succeeded) {
            if (typeof (response.data.data) === 'string') {
                dispatch({ type: REPLY_QUERY_FAIL })
                SweetAlert('warning', 'Warning!', response.data.data)
                return
            }
            dispatch({ type: REPLY_QUERY_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: REPLY_QUERY_FAIL })
    }
}

export const closeQuery = (id) => async (dispatch) => {
    dispatch({ type: CLOSE_QUERY_REQUEST })
    try {
        const response = await api.put(`/support-query/close-query/${id}`)
        if (response.data.Succeeded) {
            dispatch({ type: CLOSE_QUERY_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: CLOSE_QUERY_FAIL })
    }
}