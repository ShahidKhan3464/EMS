import { combineReducers } from 'redux';
import { list, details, blockUnblock } from './reducers';

const customersReducers = combineReducers({
    list,
    details,
    blockUnblock
})

export default customersReducers