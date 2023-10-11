import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { ADMIN_SIGNIN_REQUEST, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNIN_FAIL } from "../types";

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