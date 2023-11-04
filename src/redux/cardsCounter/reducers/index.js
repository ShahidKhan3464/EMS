import { combineReducers } from 'redux';
import { cardCounter } from './reducers';

const cardCounterReducers = combineReducers({
    cardCounter
})

export default cardCounterReducers