import { combineReducers } from 'redux';
import { list, details, refund } from './reducers';

const bookingsReducers = combineReducers({
    list,
    refund,
    details,
})

export default bookingsReducers