import { PRICE_GUIDE_REQUEST, PRICE_GUIDE_SUCCESS, PRICE_GUIDE_FAIL, PRICE_GUIDE_RESET, PRICE_GUIDE_UPDATE_REQUEST, PRICE_GUIDE_UPDATE_SUCCESS, PRICE_GUIDE_UPDATE_FAIL, PRICE_GUIDE_UPDATE_RESET } from "../types";

//Initial States
const listState = {
    data: {},
    error: null,
    loading: false,
}

const updateState = {
    message: "",
    error: null,
    loading: false,
}

//Reducers
export const list = (state = listState, action) => {
    switch (action.type) {
        case PRICE_GUIDE_REQUEST:
            return { ...state, loading: true }
        case PRICE_GUIDE_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case PRICE_GUIDE_FAIL:
            return { ...state, loading: false, data: {} }
        case PRICE_GUIDE_RESET:
            return { ...state, data: {} }
        default: return state
    }
}

export const update = (state = updateState, action) => {
    switch (action.type) {
        case PRICE_GUIDE_UPDATE_REQUEST:
            return { ...state, loading: true }
        case PRICE_GUIDE_UPDATE_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case PRICE_GUIDE_UPDATE_FAIL:
            return { ...state, loading: false, message: "" }
        case PRICE_GUIDE_UPDATE_RESET:
            return { ...state, message: "" }
        default: return state
    }
}