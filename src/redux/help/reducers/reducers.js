import { SELECTED_TAB, GET_FAQS_REQUEST, GET_FAQS_SUCCESS, GET_FAQS_FAIL, FAQS_RESET, ADD_FAQ_REQUEST, ADD_FAQ_SUCCESS, ADD_FAQ_FAIL, ADD_FAQ_RESET, UPDATE_FAQ_REQUEST, UPDATE_FAQ_SUCCESS, UPDATE_FAQ_FAIL, UPDATE_FAQ_RESET, DELETE_FAQ_REQUEST, DELETE_FAQ_SUCCESS, DELETE_FAQ_FAIL, DELETE_FAQ_RESET, GET_QUERIES_REQUEST, GET_QUERIES_SUCCESS, GET_QUERIES_FAIL, QUERIES_RESET, REPLY_QUERY_REQUEST, REPLY_QUERY_SUCCESS, REPLY_QUERY_FAIL, REPLY_QUERY_RESET, CLOSE_QUERY_REQUEST, CLOSE_QUERY_SUCCESS, CLOSE_QUERY_FAIL, CLOSE_QUERY_RESET, } from "../types";

//InitialStates
const faqsState = {
    value: 0,
    error: null,
    loading: false,
    data: {
        list: [],
        totalRecords: 0
    },
}

const addFaqState = {
    message: '',
    error: null,
}

const updateFaqState = {
    message: '',
    error: null,
}

const deleteFaqState = {
    message: '',
    error: null,
}

const queriesState = {
    value: 0,
    error: null,
    loading: false,
    data: {
        list: [],
        totalRecords: 0
    },
}

const replyQueryState = {
    data: {},
    error: null,
    loading: false,
}

const closeQueryState = {
    data: {},
    error: null,
}

//FAQs Reducers
export const faqsList = (state = faqsState, action) => {
    switch (action.type) {
        case GET_FAQS_REQUEST:
            return { ...state, loading: true }
        case GET_FAQS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case GET_FAQS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case SELECTED_TAB:
            return { ...state, value: action.payload }
        case FAQS_RESET:
            return { ...state, value: 0, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const addFaq = (state = addFaqState, action) => {
    switch (action.type) {
        case ADD_FAQ_REQUEST:
            return { ...state }
        case ADD_FAQ_SUCCESS:
            return { ...state, message: action.payload }
        case ADD_FAQ_FAIL:
            return { ...state, message: "" }
        case ADD_FAQ_RESET:
            return { ...state, message: "" }
        default: return state
    }
}

export const updateFaq = (state = updateFaqState, action) => {
    switch (action.type) {
        case UPDATE_FAQ_REQUEST:
            return { ...state }
        case UPDATE_FAQ_SUCCESS:
            return { ...state, message: action.payload }
        case UPDATE_FAQ_FAIL:
            return { ...state, message: "" }
        case UPDATE_FAQ_RESET:
            return { ...state, message: "" }
        default: return state
    }
}

export const deleteFaq = (state = deleteFaqState, action) => {
    switch (action.type) {
        case DELETE_FAQ_REQUEST:
            return { ...state }
        case DELETE_FAQ_SUCCESS:
            return { ...state, message: action.payload }
        case DELETE_FAQ_FAIL:
            return { ...state, message: "" }
        case DELETE_FAQ_RESET:
            return { ...state, message: "" }
        default: return state
    }
}

//Queries Reducers
export const queriesList = (state = queriesState, action) => {
    switch (action.type) {
        case GET_QUERIES_REQUEST:
            return { ...state, loading: true }
        case GET_QUERIES_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case GET_QUERIES_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case SELECTED_TAB:
            return { ...state, value: action.payload }
        case QUERIES_RESET:
            return { ...state, value: 0, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const replyQuery = (state = replyQueryState, action) => {
    switch (action.type) {
        case REPLY_QUERY_REQUEST:
            return { ...state, loading: true }
        case REPLY_QUERY_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case REPLY_QUERY_FAIL:
            return { ...state, loading: false, data: {} }
        case REPLY_QUERY_RESET:
            return { ...state, data: {} }
        default: return state
    }
}

export const closeQuery = (state = closeQueryState, action) => {
    switch (action.type) {
        case CLOSE_QUERY_REQUEST:
            return { ...state }
        case CLOSE_QUERY_SUCCESS:
            return { ...state, data: action.payload }
        case CLOSE_QUERY_FAIL:
            return { ...state, data: {} }
        case CLOSE_QUERY_RESET:
            return { ...state, data: {} }
        default: return state
    }
}