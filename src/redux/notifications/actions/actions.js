import moment from 'moment';
import ApiClient from 'services/api';
import SweetAlert from 'components/sweetAlert';
import { GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL, SHOW_UNREAD_NOTIFICATIONS_REQUEST, SHOW_UNREAD_NOTIFICATIONS_SUCCESS, SHOW_UNREAD_NOTIFICATIONS_FAIL, UNREAD_COUNTER_REQUEST, UNREAD_COUNTER_SUCCESS, UNREAD_COUNTER_FAIL, MARKAS_READ_NOTIFICATIONS_REQUEST, MARKAS_READ_NOTIFICATIONS_SUCCESS, MARKAS_READ_NOTIFICATIONS_FAIL } from "../types";

const api = new ApiClient();

export const notificationsList = (data) => async (dispatch) => {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST })
    try {
        const response = await api.post('/notifications/get-all', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            const sortedNotifications = [...response.data.data].sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
            dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: { data: sortedNotifications, totalRecords } })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: GET_NOTIFICATIONS_FAIL })
    }
}

export const showUnreadNotifications = (data) => async (dispatch) => {
    dispatch({ type: SHOW_UNREAD_NOTIFICATIONS_REQUEST })
    try {
        const response = await api.post('/notifications/get-all', data)
        if (response.data.Succeeded) {
            const totalRecords = response.data.TotalRecords
            const sortedNotifications = [...response.data.data].sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
            dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: { data: sortedNotifications, totalRecords } })
            dispatch({ type: SHOW_UNREAD_NOTIFICATIONS_SUCCESS, payload: response.data.message })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: SHOW_UNREAD_NOTIFICATIONS_FAIL })
    }
}

export const markAsReadNotifications = (data) => async (dispatch) => {
    dispatch({ type: MARKAS_READ_NOTIFICATIONS_REQUEST })
    try {
        const response = await api.put('/notifications/mark-as-read', data)
        if (response.data.Succeeded) {
            dispatch({ type: MARKAS_READ_NOTIFICATIONS_SUCCESS, payload: response.data.message })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: MARKAS_READ_NOTIFICATIONS_FAIL })
    }
}

export const unreadCounter = () => async (dispatch) => {
    dispatch({ type: UNREAD_COUNTER_REQUEST })
    try {
        const response = await api.get('/notifications/unread-counter')
        if (response.data.Succeeded) {
            dispatch({ type: UNREAD_COUNTER_SUCCESS, payload: response.data.data })
        }
    }
    catch (err) {
        if (err.response) {
            SweetAlert('warning', 'Warning!', err.response.data.message)
        }
        else {
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
        dispatch({ type: UNREAD_COUNTER_FAIL })
    }
}