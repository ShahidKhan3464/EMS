import { combineReducers } from 'redux';
import { list, details, changeStatus } from './reducers';

const servicesReducers = combineReducers({
    list,
    details,
    changeStatus
})

export default servicesReducers