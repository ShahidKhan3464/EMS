import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_RESET, VERIFY_PASSWORD_REQUEST, VERIFY_PASSWORD_SUCCESS, VERIFY_PASSWORD_FAIL, VERIFY_PASSWORD_RESET, CHANGE_EMAIL_REQUEST, CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_FAIL, CHANGE_EMAIL_RESET, FILE_UPLOAD_REQUEST, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAIL, FILE_UPLOAD_RESET, VIEW_PROFILE_REQUEST, VIEW_PROFILE_SUCCESS, VIEW_PROFILE_FAIL, VIEW_PROFILE_RESET } from "../types";

//InitialStates
const changePasswordState = {
    message: '',
    error: null,
    loading: false,
}

const verifyPasswordState = {
    message: '',
    error: null,
    loading: false,
}

const changeEmailState = {
    message: '',
    error: null,
    loading: false,
}

const fileUploadState = {
    message: '',
    error: null,
}

const viewProfileState = {
    error: null,
    filePath: '',
}

//Reducers
export const changePassword = (state = changePasswordState, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_REQUEST:
            return { ...state, loading: true }
        case CHANGE_PASSWORD_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case CHANGE_PASSWORD_FAIL:
            return { ...state, loading: false, message: '' }
        case CHANGE_PASSWORD_RESET:
            return { ...state, message: '' }
        default: return state
    }
}

export const verifyPassword = (state = verifyPasswordState, action) => {
    switch (action.type) {
        case VERIFY_PASSWORD_REQUEST:
            return { ...state, loading: true }
        case VERIFY_PASSWORD_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case VERIFY_PASSWORD_FAIL:
            return { ...state, loading: false, message: '' }
        case VERIFY_PASSWORD_RESET:
            return { ...state, message: '' }
        default: return state
    }
}

export const changeEmail = (state = changeEmailState, action) => {
    switch (action.type) {
        case CHANGE_EMAIL_REQUEST:
            return { ...state, loading: true }
        case CHANGE_EMAIL_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case CHANGE_EMAIL_FAIL:
            return { ...state, loading: false, message: '' }
        case CHANGE_EMAIL_RESET:
            return { ...state, message: '' }
        default: return state
    }
}

export const fileUpload = (state = fileUploadState, action) => {
    switch (action.type) {
        case FILE_UPLOAD_REQUEST:
            return { ...state, }
        case FILE_UPLOAD_SUCCESS:
            return { ...state, message: action.payload }
        case FILE_UPLOAD_FAIL:
            return { ...state, message: '' }
        case FILE_UPLOAD_RESET:
            return { ...state, message: '' }
        default: return state
    }
}

export const viewProfile = (state = viewProfileState, action) => {
    switch (action.type) {
        case VIEW_PROFILE_REQUEST:
            return { ...state, }
        case VIEW_PROFILE_SUCCESS:
            return { ...state, filePath: action.payload }
        case VIEW_PROFILE_FAIL:
            return { ...state, filePath: '' }
        case VIEW_PROFILE_RESET:
            return { ...state, filePath: '' }
        default: return state
    }
}