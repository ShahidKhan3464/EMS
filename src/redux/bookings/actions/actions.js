import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { BOOKINGS_REQUEST, BOOKINGS_SUCCESS, BOOKINGS_FAIL, BOOKING_DETAILS_REQUEST, BOOKING_DETAILS_SUCCESS, BOOKING_DETAILS_FAIL, BOOKING_REFUND_REQUEST, BOOKING_REFUND_SUCCESS, BOOKING_REFUND_FAIL } from "../types";

const api = new ApiClient();

export const bookingsList = (data) => async (dispatch) => {
    dispatch({ type: BOOKINGS_REQUEST })
    try {
        const response = await api.post('/booking/get-all-booking', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: BOOKINGS_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: BOOKINGS_FAIL })
    }
}

export const bookingDetails = (id) => async (dispatch) => {
    dispatch({ type: BOOKING_DETAILS_REQUEST })
    try {
        const response = await api.get(`/booking/get-single-booking/${id}`)
        if (response.data.Succeeded) {
            dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: BOOKING_DETAILS_FAIL })
    }
}

export const bookingRefund = (id) => async (dispatch) => {
    dispatch({ type: BOOKING_REFUND_REQUEST })
    try {
        const response = await api.put(`/booking/refund/${id}`)
        if (response.data.Succeeded) {
            dispatch({ type: BOOKING_REFUND_SUCCESS, payload: response.data.message })
            SweetAlert('success', 'Success', 'The amount has been refunded successfully')
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: BOOKING_REFUND_FAIL })
    }
}