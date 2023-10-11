import { combineReducers } from 'redux';
import { list, details, approval, blockUnblock, bookingDetails } from './reducers';

const serviceProvidersReducers = combineReducers({
    list,
    details,
    approval,
    blockUnblock,
    bookingDetails,
})

export default serviceProvidersReducers