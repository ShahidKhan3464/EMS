import { combineReducers } from 'redux';
import { list, details } from './reducers';

const bookingsReducers = combineReducers({
    list,
    details
})

export default bookingsReducers