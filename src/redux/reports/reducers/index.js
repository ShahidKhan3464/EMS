import { combineReducers } from 'redux';
import { reportsList, replyReport, closeReport } from './reducers';

const reportsReducers = combineReducers({
    reportsList,
    replyReport,
    closeReport
})

export default reportsReducers