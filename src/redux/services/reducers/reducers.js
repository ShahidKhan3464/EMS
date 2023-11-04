import { locations } from "utils";
import { SERVICES_REQUEST, SERVICES_SUCCESS, SERVICES_FAIL, SERVICES_RESET, SERVICE_DETAILS_REQUEST, SERVICE_DETAILS_SUCCESS, SERVICE_DETAILS_FAIL, SERVICE_DETAILS_RESET, CHANGE_SERVICE_STATUS_REQUEST, CHANGE_SERVICE_STATUS_SUCCESS, CHANGE_SERVICE_STATUS_FAIL, CHANGE_SERVICE_STATUS_RESET } from "../types";

//Options
const serviceCategory = [
    { value: 'music', text: 'Music' },
    { value: 'Staging', text: 'Staging' },
    { value: 'location', text: 'Location' },
    { value: 'catering', text: 'Catering' },
    { value: 'entertainment', text: 'Entertainment' },
]

const rating = [
    { value: '1', text: '1 star' },
    { value: '2', text: '2 stars' },
    { value: '3', text: '3 stars' },
    { value: '4', text: '4 stars' },
    { value: '5', text: '5 stars' },
]

const status = [
    { value: 'available', text: 'Available' },
    { value: 'unavailable', text: 'Unavailable' },
]

//Initial States
const listState = {
    error: null,
    loading: false,
    data: {
        status,
        rating,
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

const statusState = {
    message: "",
    error: null,
    loading: false,
}

//Reducers
export const list = (state = listState, action) => {
    switch (action.type) {
        case SERVICES_REQUEST:
            return { ...state, loading: true }
        case SERVICES_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case SERVICES_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case SERVICES_RESET:
            return { ...state, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const details = (state = detailsState, action) => {
    switch (action.type) {
        case SERVICE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case SERVICE_DETAILS_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case SERVICE_DETAILS_FAIL:
            return { ...state, loading: false, data: {} }
        case SERVICE_DETAILS_RESET:
            return { ...state, data: {} }
        default: return state
    }
}

export const changeStatus = (state = statusState, action) => {
    switch (action.type) {
        case CHANGE_SERVICE_STATUS_REQUEST:
            return { ...state, loading: true }
        case CHANGE_SERVICE_STATUS_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case CHANGE_SERVICE_STATUS_FAIL:
            return { ...state, loading: false, message: "" }
        case CHANGE_SERVICE_STATUS_RESET:
            return { ...state, message: "" }
        default: return state
    }
}