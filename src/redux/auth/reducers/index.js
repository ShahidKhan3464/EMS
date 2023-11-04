import { combineReducers } from 'redux';
import { adminSignIn, forgotPassword, verifyOtp, resetPassword } from './reducers';

const authReducers = combineReducers({
    adminSignIn,
    forgotPassword,
    verifyOtp,
    resetPassword
})

export default authReducers