import { TRANSACTIONS_REQUEST, TRANSACTIONS_SUCCESS, TRANSACTIONS_FAIL, TRANSACTIONS_RESET, TRANSACTION_DETAILS_REQUEST, TRANSACTION_DETAILS_SUCCESS, TRANSACTION_DETAILS_FAIL, TRANSACTION_DETAILS_RESET, TRANSACTION_REVENUE_REQUEST, TRANSACTION_REVENUE_SUCCESS, TRANSACTION_REVENUE_FAIL, TRANSACTION_REVENUE_RESET } from "../types";

//Options
const advancePayments = [
    { value: '05', text: '5%' },
    { value: '10', text: '10%' },
    { value: '15', text: '15%' },
    { value: '20', text: '20%' },
    { value: '25', text: '25%' },
    { value: '30', text: '30%' },
    { value: '35', text: '35%' },
    { value: '40', text: '40%' },
    { value: '45', text: '45%' },
    { value: '50', text: '50%' },
]

const noOfMonths = [
    { value: 1, text: '01 month' },
    { value: 2, text: '02 months' },
    { value: 3, text: '03 months' },
    { value: 4, text: '04 months' },
    { value: 5, text: '05 months' },
    { value: 6, text: '06 months' },
    { value: 7, text: '07 months' },
    { value: 8, text: '08 months' },
    { value: 9, text: '09 months' },
    { value: 10, text: '10 months' },
    { value: 11, text: '11 months' },
    { value: 12, text: '12 months' },
]

//Initial States
const listState = {
    error: null,
    loading: false,
    data: {
        list: [],
        advancePayments,
        totalRecords: 0,
    }
}

const detailsState = {
    data: {},
    error: null,
    loading: false,
}

const revenueState = {
    error: null,
    loading: false,
    data: {
        list: [],
        noOfMonths
    },
}

//Reducers
export const list = (state = listState, action) => {
    switch (action.type) {
        case TRANSACTIONS_REQUEST:
            return { ...state, loading: true }
        case TRANSACTIONS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case TRANSACTIONS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case TRANSACTIONS_RESET:
            return { ...state, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const details = (state = detailsState, action) => {
    switch (action.type) {
        case TRANSACTION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case TRANSACTION_DETAILS_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case TRANSACTION_DETAILS_FAIL:
            return { ...state, loading: false, data: {} }
        case TRANSACTION_DETAILS_RESET:
            return { ...state, data: {} }
        default: return state
    }
}

export const revenue = (state = revenueState, action) => {
    switch (action.type) {
        case TRANSACTION_REVENUE_REQUEST:
            return { ...state, loading: true }
        case TRANSACTION_REVENUE_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload } }
        case TRANSACTION_REVENUE_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [] } }
        case TRANSACTION_REVENUE_RESET:
            return { ...state, data: { ...state.data, list: [] } }
        default: return state
    }
}