import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { UPDATE_EMAIL_SUCCESS } from 'redux/auth/types';
import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL, VERIFY_PASSWORD_REQUEST, VERIFY_PASSWORD_SUCCESS, VERIFY_PASSWORD_FAIL, CHANGE_EMAIL_REQUEST, CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_FAIL, FILE_UPLOAD_REQUEST, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_FAIL, VIEW_PROFILE_REQUEST, VIEW_PROFILE_SUCCESS, VIEW_PROFILE_FAIL } from '../types';

const api = new ApiClient();

export const changePassword = (data) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST })
  try {
    const response = await api.post('/auth/change-password', data)
    if (response.data.Succeeded) {
      dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data.message })
      SweetAlert('success', 'Success', 'Password has been successfully updated')
    }
  }
  catch (err) {
    if (err.response) {
      SweetAlert('warning', 'Warning!', 'Invalid current password')
    }
    else {
      SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
    }
    dispatch({ type: CHANGE_PASSWORD_FAIL })
  }
}

export const verifyPassword = (data) => async (dispatch) => {
  dispatch({ type: VERIFY_PASSWORD_REQUEST })
  try {
    const response = await api.post('/auth/verify-admin-password', data)
    if (response.data.Succeeded) {
      dispatch({ type: VERIFY_PASSWORD_SUCCESS, payload: response.data.message })
    }
  }
  catch (err) {
    if (err.response) {
      SweetAlert('warning', 'Warning!', 'Invalid current password')
    }
    else {
      SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
    }
    dispatch({ type: VERIFY_PASSWORD_FAIL })
  }
}

export const changeEmail = (data) => async (dispatch) => {
  dispatch({ type: CHANGE_EMAIL_REQUEST })
  try {
    const response = await api.put('/auth/change-admin-email', data)
    if (response.data.Succeeded) {
      dispatch({ type: UPDATE_EMAIL_SUCCESS, payload: data.email })
      dispatch({ type: CHANGE_EMAIL_SUCCESS, payload: response.data.message })
      SweetAlert('success', 'Update successful', 'Email has been updated successfully')
    }
  }
  catch (err) {
    if (err.response) {
      SweetAlert('warning', 'Warning!', err.response.data.message)
    }
    else {
      SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
    }
    dispatch({ type: CHANGE_EMAIL_FAIL })
  }
}

export const fileUpload = (data) => async (dispatch) => {
  dispatch({ type: FILE_UPLOAD_REQUEST })
  try {
    const response = await api.post('/admin-profile/create-update-admin-profile', data)
    if (response.data.Succeeded) {
      SweetAlert('success', 'Success', 'File has been uploaded successfully')
      dispatch({ type: FILE_UPLOAD_SUCCESS, payload: response.data.message })
    }
  }
  catch (err) {
    if (err.response) {
      SweetAlert('warning', 'Warning!', err.response.data.message)
    }
    else {
      SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
    }
    dispatch({ type: FILE_UPLOAD_FAIL })
  }
}

export const viewProfile = () => async (dispatch) => {
  dispatch({ type: VIEW_PROFILE_REQUEST })
  try {
    const response = await api.get('/admin-profile/view-profile')
    if (response.data.Succeeded) {
      dispatch({ type: VIEW_PROFILE_SUCCESS, payload: response.data.data.adminProfile.logo })
    }
  }
  catch (err) {
    if (err.response) {
      SweetAlert('warning', 'Warning!', err.response.data.message)
    }
    else {
      SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
    }
    dispatch({ type: VIEW_PROFILE_FAIL })
  }
}