import { ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQUEST, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNOUT, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_RESET, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_RESET, RESET_PASSWORD_SUCCESS, UPDATE_EMAIL_SUCCESS, VERIFY_OTP_FAIL, VERIFY_OTP_REQUEST, VERIFY_OTP_RESET, VERIFY_OTP_SUCCESS } from "../types";

//Initial States
const initialState = {
    data: {},
    error: null,
    loading: false,
}

const forgotPasswordState = {
    message: '',
    error: null,
    loading: false,
}

const verifyOtpState = {
    message: '',
    error: null,
    loading: false,
}

const resetPasswordState = {
    message: '',
    error: null,
    loading: false,
}

//Reducers
export const adminSignIn = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_SIGNIN_REQUEST:
            return { ...state, loading: true }
        case ADMIN_SIGNIN_SUCCESS:
            const newObj = {
                email: action.payload.email,
                token: action.payload.token
            }
            return { ...state, loading: false, data: newObj }
        case ADMIN_SIGNIN_FAIL:
            return { ...state, loading: false }
        case UPDATE_EMAIL_SUCCESS:
            return { ...state, data: { email: action.payload, token: state.data.token } }
        case ADMIN_SIGNOUT:
            return { ...state, data: {} }
        default: return state
    }
}

export const forgotPassword = (state = forgotPasswordState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return { ...state, loading: true }
        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case FORGOT_PASSWORD_FAIL:
            return { ...state, loading: false, message: '' }
        case FORGOT_PASSWORD_RESET:
            return { ...state, message: '' }
        default: return state
    }
}

export const verifyOtp = (state = verifyOtpState, action) => {
    switch (action.type) {
        case VERIFY_OTP_REQUEST:
            return { ...state, loading: true }
        case VERIFY_OTP_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case VERIFY_OTP_FAIL:
            return { ...state, loading: false, message: '' }
        case VERIFY_OTP_RESET:
            return { ...state, message: '' }
        default: return state
    }
}

export const resetPassword = (state = resetPasswordState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return { ...state, loading: true }
        case RESET_PASSWORD_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case RESET_PASSWORD_FAIL:
            return { ...state, loading: false, message: '' }
        case RESET_PASSWORD_RESET:
            return { ...state, message: '' }
        default: return state
    }
}