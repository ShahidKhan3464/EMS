import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { TRANSACTIONS_REQUEST, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAIL } from "../types";

const api = new ApiClient();

export const transactionsList = (data) => async (dispatch) => {
    dispatch({ type: TRANSACTIONS_REQUEST })
    try {
        const response = await api.post('/transaction/get-all', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            dispatch({ type: TRANSACTIONS_SUCCESS, payload: { data: response.data.data, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: TRANSACTIONS_FAIL })
    }
}