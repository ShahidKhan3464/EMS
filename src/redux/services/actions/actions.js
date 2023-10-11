import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { SERVICES_REQUEST, SERVICES_SUCCESS, SERVICES_FAIL, SERVICE_DETAILS_REQUEST, SERVICE_DETAILS_SUCCESS, SERVICE_DETAILS_FAIL, CHANGE_SERVICE_STATUS_REQUEST, CHANGE_SERVICE_STATUS_SUCCESS, CHANGE_SERVICE_STATUS_FAIL } from "../types";

const api = new ApiClient();

export const servicesList = (data) => async (dispatch) => {
    dispatch({ type: SERVICES_REQUEST })
    try {
        const response = await api.post('/provider-services/get-all', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: SERVICES_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: SERVICES_FAIL })
    }
}

export const serviceDetails = (id) => async (dispatch) => {
    dispatch({ type: SERVICE_DETAILS_REQUEST })
    try {
        const response = await api.get(`/provider-services/${id}`,)
        if (response.data.Succeeded) {
            dispatch({ type: SERVICE_DETAILS_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: SERVICE_DETAILS_FAIL })
    }
}

export const changeServiceStatus = (id, data) => async (dispatch) => {
    dispatch({ type: CHANGE_SERVICE_STATUS_REQUEST })
    try {
        const response = await api.put(`/provider-services/change-status/${id}`, data)
        if (response.data.Succeeded) {
            if (data.status === 'ACTIVE') {
                SweetAlert('success', 'Active', 'Service has been active successfully')
                dispatch({ type: CHANGE_SERVICE_STATUS_SUCCESS, payload: response.data.message })
            }
            else if (data.status === 'INACTIVE') {
                SweetAlert('success', 'Inactive', 'Service has been inactive successfully')
                dispatch({ type: CHANGE_SERVICE_STATUS_SUCCESS, payload: response.data.message })
            }
        }
    }
    catch (err) {
        console.log(err, "ERROR")
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: CHANGE_SERVICE_STATUS_FAIL })
    }
}