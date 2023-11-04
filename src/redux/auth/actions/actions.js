import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { ADMIN_SIGNIN_REQUEST, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNIN_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "../types";

const api = new ApiClient();

export const adminSignIn = (data) => async (dispatch) => {
    dispatch({ type: ADMIN_SIGNIN_REQUEST })
    try {
        const response = await api.post('/auth/login', data)
        if (response.data.Succeeded) {
            const authToken = response.data.data.token
            if (authToken) {
                dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: response.data.data })
                window.location.href = '/dashboard'
            }
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', 'Invalid credentials')
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: ADMIN_SIGNIN_FAIL })
    }
}

export const forgotPassword = (data, moveRouter) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })
    try {
        const response = await api.post('/user/forgot-password', data)
        if (response.data.Succeeded) {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data.message })
            moveRouter(data.email)
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: FORGOT_PASSWORD_FAIL })
    }
}

export const verifyOtp = (data, moveRouter) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST })
    try {
        const response = await api.post('/user/verify-otp', data)
        if (response.data.Succeeded) {
            dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data.message })
            moveRouter()
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: VERIFY_OTP_FAIL })
    }
}

export const resetPassword = (data, moveRouter) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST })
    try {
        const response = await api.post('/user/create-password', data)
        if (response.data.Succeeded) {
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data.message })
            SweetAlert('success', 'Success', 'Your password has been changed successfully')
            moveRouter()
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ RESET_PASSWORD_FAIL })
    }
}