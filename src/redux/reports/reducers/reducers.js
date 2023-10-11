import { SELECTED_TAB, GET_REPORTS_REQUEST, GET_REPORTS_SUCCESS, GET_REPORTS_FAIL, REPORTS_RESET, REPLY_REPORT_REQUEST, REPLY_REPORT_SUCCESS, REPLY_REPORT_FAIL, REPLY_REPORT_RESET, CLOSE_REPORT_REQUEST, CLOSE_REPORT_SUCCESS, CLOSE_REPORT_FAIL, CLOSE_REPORT_RESET, } from "../types";

//InitialStates
const reportsState = {
    value: 0,
    error: null,
    loading: false,
    data: {
        list: [],
        totalRecords: 0
    },
}

const replyReportState = {
    data: {},
    error: null,
    loading: false,
}

const closeReportState = {
    data: {},
    error: null,
}

//Reports Reducers
export const reportsList = (state = reportsState, action) => {
    switch (action.type) {
        case GET_REPORTS_REQUEST:
            return { ...state, loading: true }
        case GET_REPORTS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case GET_REPORTS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case SELECTED_TAB:
            return { ...state, value: action.payload }
        case REPORTS_RESET:
            return { ...state, value: 0, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const replyReport = (state = replyReportState, action) => {
    switch (action.type) {
        case REPLY_REPORT_REQUEST:
            return { ...state, loading: true }
        case REPLY_REPORT_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case REPLY_REPORT_FAIL:
            return { ...state, loading: false, data: {} }
        case REPLY_REPORT_RESET:
            return { ...state, data: {} }
        default: return state
    }
}

export const closeReport = (state = closeReportState, action) => {
    switch (action.type) {
        case CLOSE_REPORT_REQUEST:
            return { ...state }
        case CLOSE_REPORT_SUCCESS:
            return { ...state, data: action.payload }
        case CLOSE_REPORT_FAIL:
            return { ...state, data: {} }
        case CLOSE_REPORT_RESET:
            return { ...state, data: {} }
        default: return state
    }
}