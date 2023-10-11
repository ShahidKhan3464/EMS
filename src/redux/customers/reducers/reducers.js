import { locations } from "utils";
import { CUSTOMERS_REQUEST, CUSTOMERS_SUCCESS, CUSTOMERS_FAIL, CUSTOMERS_RESET, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, CUSTOMER_DETAILS_FAIL, CUSTOMER_DETAILS_RESET, CUSTOMER_BLOCK_UNBLOCK_REQUEST, CUSTOMER_BLOCK_UNBLOCK_SUCCESS, CUSTOMER_BLOCK_UNBLOCK_FAIL, CUSTOMER_BLOCK_UNBLOCK_RESET } from "../types";

//InitialStates
const listState = {
    error: null,
    loading: false,
    data: {
        list: [],
        locations,
        totalRecords: 0,
    },
}

const detailsState = {
    data: {},
    error: null,
    loading: false,
}

const blockUnblockState = {
    message: "",
    error: null,
    loading: false,
}

//Reducers
export const list = (state = listState, action) => {
    switch (action.type) {
        case CUSTOMERS_REQUEST:
            return { ...state, loading: true }
        case CUSTOMERS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case CUSTOMERS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case CUSTOMERS_RESET:
            return { ...state, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const details = (state = detailsState, action) => {
    switch (action.type) {
        case CUSTOMER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case CUSTOMER_DETAILS_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case CUSTOMER_DETAILS_FAIL:
            return { ...state, loading: false, data: {} }
        case CUSTOMER_DETAILS_RESET:
            return { ...state, data: {} }
        default: return state
    }
}

export const blockUnblock = (state = blockUnblockState, action) => {
    switch (action.type) {
        case CUSTOMER_BLOCK_UNBLOCK_REQUEST:
            return { ...state, loading: true }
        case CUSTOMER_BLOCK_UNBLOCK_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case CUSTOMER_BLOCK_UNBLOCK_FAIL:
            return { ...state, loading: false, message: "" }
        case CUSTOMER_BLOCK_UNBLOCK_RESET:
            return { ...state, message: "" }
        default: return state
    }
}