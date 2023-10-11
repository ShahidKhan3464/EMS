import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { SERVICE_PROVIDERS_REQUEST, SERVICE_PROVIDERS_SUCCESS, SERVICE_PROVIDERS_FAIL, SERVICE_PROVIDER_BOOKING_DETAILS_REQUEST, SERVICE_PROVIDER_BOOKING_DETAILS_SUCCESS, SERVICE_PROVIDER_BOOKING_DETAILS_FAIL, SERVICE_PROVIDER_DETAILS_REQUEST, SERVICE_PROVIDER_DETAILS_SUCCESS, SERVICE_PROVIDER_DETAILS_FAIL, SERVICE_PROVIDER_APPROVAL_REQUEST, SERVICE_PROVIDER_APPROVAL_SUCCESS, SERVICE_PROVIDER_APPROVAL_FAIL, SERVICE_PROVIDER_BLOCK_UNBLOCK_REQUEST, SERVICE_PROVIDER_BLOCK_UNBLOCK_SUCCESS, SERVICE_PROVIDER_BLOCK_UNBLOCK_FAIL } from "../types";

const api = new ApiClient();

export const serviceProvidersList = (data) => async (dispatch) => {
    dispatch({ type: SERVICE_PROVIDERS_REQUEST })
    try {
        const response = await api.post('/user/all-service-provider', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: SERVICE_PROVIDERS_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: SERVICE_PROVIDERS_FAIL })
    }
}

export const serviceProviderBookingDetails = (data) => async (dispatch) => {
    dispatch({ type: SERVICE_PROVIDER_BOOKING_DETAILS_REQUEST })
    try {
        const response = await api.post('/booking/get-all-booking', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: SERVICE_PROVIDER_BOOKING_DETAILS_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: SERVICE_PROVIDER_BOOKING_DETAILS_FAIL })
    }
}

export const serviceProviderDetails = (id) => async (dispatch) => {
    dispatch({ type: SERVICE_PROVIDER_DETAILS_REQUEST })
    try {
        const response = await api.get(`/user/service-provider-detail/${id}`)
        if (response.data.Succeeded) {
            dispatch({ type: SERVICE_PROVIDER_DETAILS_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: SERVICE_PROVIDER_DETAILS_FAIL })
    }
}

export const serviceProviderApproval = (id, data) => async (dispatch) => {
    dispatch({ type: SERVICE_PROVIDER_APPROVAL_REQUEST })
    try {
        const response = await api.post(`/user/approved-provider/${id}`, data)
        if (response.data.Succeeded) {
            if (data.profileApprovedStatus === 'APPROVED') {
                SweetAlert('success', 'Approved', 'Service provider has been approved successfully')
                dispatch({ type: SERVICE_PROVIDER_APPROVAL_SUCCESS, payload: response.data.message })
            }
            else if (data.profileApprovedStatus === 'REJECTED') {
                SweetAlert('success', 'Rejected', 'Service provider has been rejected successfully')
                dispatch({ type: SERVICE_PROVIDER_APPROVAL_SUCCESS, payload: response.data.message })
            }
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: SERVICE_PROVIDER_APPROVAL_FAIL })
    }
}

export const serviceProviderBlockUnBlock = (id, data) => async (dispatch) => {
    dispatch({ type: SERVICE_PROVIDER_BLOCK_UNBLOCK_REQUEST })
    try {
        const response = await api.put(`/user/block-unblock/${id}`, data)
        if (response.data.Succeeded) {
            dispatch({ type: SERVICE_PROVIDER_BLOCK_UNBLOCK_SUCCESS, payload: response.data.message })
            if (data.block) {
                SweetAlert('success', 'Blocked', 'Service provider has been blocked successfully')
                return
            }
            SweetAlert('success', 'Unblocked', 'Service provider has been unblocked successfully')
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: SERVICE_PROVIDER_BLOCK_UNBLOCK_FAIL })
    }
}