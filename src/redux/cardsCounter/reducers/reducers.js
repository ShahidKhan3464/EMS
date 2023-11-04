import { COUNTER_RESET, GET_COUNTER_FAIL, GET_COUNTER_REQUEST, GET_COUNTER_SUCCESS } from "../types";

//InitialState
const counterState = {
    data: {},
    error: null,
    loading: false,
}

//CardCounter Reducer
export const cardCounter = (state = counterState, action) => {
    switch (action.type) {
        case GET_COUNTER_REQUEST:
            return { ...state, loading: true }
        case GET_COUNTER_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case GET_COUNTER_FAIL:
            return { ...state, loading: false, data: {}, }
        case COUNTER_RESET:
            return { ...state, loading: false, data: {}, }
        default: return state
    }
}