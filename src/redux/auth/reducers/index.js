import { combineReducers } from 'redux';
import { adminSignIn } from './reducers';

const authReducers = combineReducers({
    adminSignIn
})

export default authReducers