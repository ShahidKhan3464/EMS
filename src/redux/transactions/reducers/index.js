import { combineReducers } from 'redux';
import { list } from './reducers';

const transactionsReducers = combineReducers({
    list,
})

export default transactionsReducers