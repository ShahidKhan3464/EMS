import { GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL, GET_NOTIFICATIONS_RESET, SHOW_UNREAD_NOTIFICATIONS_REQUEST, SHOW_UNREAD_NOTIFICATIONS_SUCCESS, SHOW_UNREAD_NOTIFICATIONS_FAIL, SHOW_UNREAD_NOTIFICATIONS_RESET, UNREAD_COUNTER_REQUEST, UNREAD_COUNTER_SUCCESS, UNREAD_COUNTER_FAIL, UNREAD_COUNTER_RESET, MARKAS_READ_NOTIFICATIONS_REQUEST, MARKAS_READ_NOTIFICATIONS_SUCCESS, MARKAS_READ_NOTIFICATIONS_FAIL, MARKAS_READ_NOTIFICATIONS_RESET } from "../types";

//InitialStates
const listState = {
    error: null,
    loading: false,
    data: {
        list: [],
        totalRecords: 0
    }
}

const unreadState = {
    error: null,
    message: "",
    loading: false,
}

const markAsReadState = {
    message: '',
    error: null,
}

const counterState = {
    data: 0,
    error: null,
}

//Reducers
export const list = (state = listState, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS_REQUEST:
            return { ...state, loading: true }
        case GET_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, data: { ...state.data, list: action.payload.data, totalRecords: action.payload.totalRecords } }
        case GET_NOTIFICATIONS_FAIL:
            return { ...state, loading: false, data: { ...state.data, list: [], totalRecords: 0 } }
        case GET_NOTIFICATIONS_RESET:
            return { ...state, data: { ...state.data, list: [], totalRecords: 0 } }
        default: return state
    }
}

export const showUnread = (state = unreadState, action) => {
    switch (action.type) {
        case SHOW_UNREAD_NOTIFICATIONS_REQUEST:
            return { ...state, loading: true }
        case SHOW_UNREAD_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case SHOW_UNREAD_NOTIFICATIONS_FAIL:
            return { ...state, loading: false, message: "" }
        case SHOW_UNREAD_NOTIFICATIONS_RESET:
            return { ...state, message: "" }
        default: return state
    }
}

export const markAsRead = (state = markAsReadState, action) => {
    switch (action.type) {
        case MARKAS_READ_NOTIFICATIONS_REQUEST:
            return { ...state, loading: true }
        case MARKAS_READ_NOTIFICATIONS_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case MARKAS_READ_NOTIFICATIONS_FAIL:
            return { ...state, loading: false, message: "" }
        case MARKAS_READ_NOTIFICATIONS_RESET:
            return { ...state, message: "" }
        default: return state
    }
}

export const unreadCounter = (state = counterState, action) => {
    switch (action.type) {
        case UNREAD_COUNTER_REQUEST:
            return { ...state }
        case UNREAD_COUNTER_SUCCESS:
            return { ...state, data: action.payload }
        case UNREAD_COUNTER_FAIL:
            return { ...state, data: 0 }
        case UNREAD_COUNTER_RESET:
            return { ...state, data: 0 }
        default: return state
    }
}