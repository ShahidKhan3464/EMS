import { combineReducers } from 'redux';
import { list, details, revenue } from './reducers';

const transactionsReducers = combineReducers({
    list,
    details,
    revenue
})

export default transactionsReducers