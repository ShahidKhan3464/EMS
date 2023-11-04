import { locations } from "utils";
import { BOOKINGS_REQUEST, BOOKINGS_SUCCESS, BOOKINGS_FAIL, BOOKINGS_RESET, BOOKING_DETAILS_REQUEST, BOOKING_DETAILS_SUCCESS, BOOKING_DETAILS_FAIL, BOOKING_DETAILS_RESET, BOOKING_REFUND_REQUEST, BOOKING_REFUND_SUCCESS, BOOKING_REFUND_FAIL, BOOKING_REFUND_RESET } from "../types";

//Options
const serviceCategory = [
    { value: 'music', text: 'Music' },
    { value: 'Staging', text: 'Staging' },
    { value: 'location', text: 'Location' },
    { value: 'catering', text: 'Catering' },
    { value: 'entertainment', text: 'Entertainment' },
]

const status = [
    { value: 'completed', text: 'Completed' },
    { value: 'in_progress', text: 'In progress' },
]

//Initial States
const listState = {
    error: null,
    loading: false,
    data: {
        status,
        list: [],
        locations,
        totalRecords: 0,
        serviceCategory,
    }
}

const detailsState = {
    data: {},
    error: null,
    loading: false,
}

const refundState = {
    message: '',
    error: null,
    loading: false,
}

//Reducers
export const list = (state = listState, action) => {
    switch (action.type) {
        case BOOKINGS_REQUEST:
            return { ...state, loading: true }
        case BOOKINGS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case BOOKINGS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case BOOKINGS_RESET:
            return { ...state, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const details = (state = detailsState, action) => {
    switch (action.type) {
        case BOOKING_DETAILS_REQUEST:
            return { ...state, loading: true }
        case BOOKING_DETAILS_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case BOOKING_DETAILS_FAIL:
            return { ...state, loading: false, data: {} }
        case BOOKING_DETAILS_RESET:
            return { ...state, data: {} }
        default: return state
    }
}

export const refund = (state = refundState, action) => {
    switch (action.type) {
        case BOOKING_REFUND_REQUEST:
            return { ...state, loading: true }
        case BOOKING_REFUND_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case BOOKING_REFUND_FAIL:
            return { ...state, loading: false, message: "" }
        case BOOKING_REFUND_RESET:
            return { ...state, message: "" }
        default: return state
    }
}