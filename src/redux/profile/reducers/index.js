import { combineReducers } from 'redux';
import { changePassword, verifyPassword, changeEmail, viewProfile, fileUpload } from './reducers';

const profileReducers = combineReducers({
    changePassword,
    verifyPassword,
    changeEmail,
    viewProfile,
    fileUpload,
})

export default profileReducers