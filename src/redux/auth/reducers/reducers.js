import { ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQUEST, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNOUT, UPDATE_EMAIL_SUCCESS } from "../types";

//Initial States
const initialState = {
    data: {},
    error: null,
    loading: false,
}

//Reducers
export const adminSignIn = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_SIGNIN_REQUEST:
            return { ...state, loading: true }
        case ADMIN_SIGNIN_SUCCESS:
            const newObj = {
                email: action.payload.email,
                token: action.payload.token
            }
            return { ...state, loading: false, data: newObj }
        case ADMIN_SIGNIN_FAIL:
            return { ...state, loading: false }
        case UPDATE_EMAIL_SUCCESS:
            return { ...state, data: { email: action.payload, token: state.data.token } }
        case ADMIN_SIGNOUT:
            return { ...state, data: {} }
        default: return state
    }
}