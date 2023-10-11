import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { PRICE_GUIDE_REQUEST, PRICE_GUIDE_SUCCESS, PRICE_GUIDE_FAIL, PRICE_GUIDE_UPDATE_REQUEST, PRICE_GUIDE_UPDATE_SUCCESS, PRICE_GUIDE_UPDATE_FAIL } from "../types";

const api = new ApiClient();

export const priceGuideList = () => async (dispatch) => {
    dispatch({ type: PRICE_GUIDE_REQUEST })
    try {
        const response = await api.get('/price-guide')
        if (response.data.Succeeded) {
            const categorizedData = response.data.data.reduce((acc, item) => {
                const { category } = item

                if (!acc[category]) {
                    acc[category] = []
                }

                acc[category].push(item)

                return acc
            }, {})

            dispatch({ type: PRICE_GUIDE_SUCCESS, payload: categorizedData })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: PRICE_GUIDE_FAIL })
    }
}

export const priceGuideUpdate = (id, data) => async (dispatch) => {
    dispatch({ type: PRICE_GUIDE_UPDATE_REQUEST })
    try {
        const response = await api.post(`/price-guide/update/${id}`, data)
        if (response.data.Succeeded) {
            dispatch({ type: PRICE_GUIDE_UPDATE_SUCCESS, payload: response.data.message })
            SweetAlert('success', 'Success', 'Price guide has been successfully updated')
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: PRICE_GUIDE_UPDATE_FAIL })
    }
}