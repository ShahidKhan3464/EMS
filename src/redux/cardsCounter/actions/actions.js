import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { GET_COUNTER_REQUEST, GET_COUNTER_SUCCESS, GET_COUNTER_FAIL, } from "../types";

const api = new ApiClient();

//Counter Actions
export const cardCounter = () => async (dispatch) => {
    dispatch({ type: GET_COUNTER_REQUEST })
    try {
        const response = await api.get('/transaction/card-data')
        if (response.data.Succeeded) {
            dispatch({ type: GET_COUNTER_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: GET_COUNTER_FAIL })
    }
}
