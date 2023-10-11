import { locations } from "utils";
import { SERVICE_PROVIDERS_REQUEST, SERVICE_PROVIDERS_SUCCESS, SERVICE_PROVIDERS_FAIL, SERVICE_PROVIDERS_RESET, SERVICE_PROVIDER_DETAILS_REQUEST, SERVICE_PROVIDER_DETAILS_SUCCESS, SERVICE_PROVIDER_DETAILS_FAIL, SERVICE_PROVIDER_DETAILS_RESET, SERVICE_PROVIDER_APPROVAL_REQUEST, SERVICE_PROVIDER_APPROVAL_SUCCESS, SERVICE_PROVIDER_APPROVAL_FAIL, SERVICE_PROVIDER_APPROVAL_RESET, SERVICE_PROVIDER_BOOKING_DETAILS_REQUEST, SERVICE_PROVIDER_BOOKING_DETAILS_SUCCESS, SERVICE_PROVIDER_BOOKING_DETAILS_FAIL, SERVICE_PROVIDER_BOOKING_DETAILS_RESET, SERVICE_PROVIDER_BLOCK_UNBLOCK_REQUEST, SERVICE_PROVIDER_BLOCK_UNBLOCK_SUCCESS, SERVICE_PROVIDER_BLOCK_UNBLOCK_FAIL, SERVICE_PROVIDER_BLOCK_UNBLOCK_RESET } from "../types";

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

const priceRange = [

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

const approvalState = {
    message: '',
    error: null,
    loading: false,
}

const bookingDetailsState = {
    error: null,
    loading: false,
    data: {
        list: [],
        priceRange,
        totalRecords: 0,
        serviceCategory,
    }
}

const blockUnblockState = {
    message: "",
    error: null,
    loading: false,
}

//Reducers
export const list = (state = listState, action) => {
    switch (action.type) {
        case SERVICE_PROVIDERS_REQUEST:
            return { ...state, loading: true }
        case SERVICE_PROVIDERS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case SERVICE_PROVIDERS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case SERVICE_PROVIDERS_RESET:
            return { ...state, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const details = (state = detailsState, action) => {
    switch (action.type) {
        case SERVICE_PROVIDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case SERVICE_PROVIDER_DETAILS_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case SERVICE_PROVIDER_DETAILS_FAIL:
            return { ...state, loading: false, data: {} }
        case SERVICE_PROVIDER_DETAILS_RESET:
            return { ...state, data: {} }
        default: return state
    }
}

export const approval = (state = approvalState, action) => {
    switch (action.type) {
        case SERVICE_PROVIDER_APPROVAL_REQUEST:
            return { ...state, loading: true }
        case SERVICE_PROVIDER_APPROVAL_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case SERVICE_PROVIDER_APPROVAL_FAIL:
            return { ...state, loading: false, message: '' }
        case SERVICE_PROVIDER_APPROVAL_RESET:
            return { ...state, message: '' }
        default: return state
    }
}

export const bookingDetails = (state = bookingDetailsState, action) => {
    switch (action.type) {
        case SERVICE_PROVIDER_BOOKING_DETAILS_REQUEST:
            return { ...state, loading: true }
        case SERVICE_PROVIDER_BOOKING_DETAILS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case SERVICE_PROVIDER_BOOKING_DETAILS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case SERVICE_PROVIDER_BOOKING_DETAILS_RESET:
            return { ...state, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const blockUnblock = (state = blockUnblockState, action) => {
    switch (action.type) {
        case SERVICE_PROVIDER_BLOCK_UNBLOCK_REQUEST:
            return { ...state, loading: true }
        case SERVICE_PROVIDER_BLOCK_UNBLOCK_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case SERVICE_PROVIDER_BLOCK_UNBLOCK_FAIL:
            return { ...state, loading: false, message: "" }
        case SERVICE_PROVIDER_BLOCK_UNBLOCK_RESET:
            return { ...state, message: "" }
        default: return state
    }
}