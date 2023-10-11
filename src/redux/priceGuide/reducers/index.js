import { combineReducers } from 'redux';
import { list, update } from './reducers';

const priceGuideReducers = combineReducers({
    list,
    update
})

export default priceGuideReducers