import { combineReducers } from 'redux';
import { list, showUnread, markAsRead, unreadCounter } from './reducers';

const notificationsReducers = combineReducers({
    list,
    showUnread,
    markAsRead,
    unreadCounter
})

export default notificationsReducers