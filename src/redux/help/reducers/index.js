import { combineReducers } from 'redux';
import { faqsList, addFaq, updateFaq, deleteFaq, replyQuery, closeQuery, queriesList } from './reducers';

const helpReducers = combineReducers({
    addFaq,
    faqsList,
    updateFaq,
    deleteFaq,
    replyQuery,
    closeQuery,
    queriesList,
})

export default helpReducers