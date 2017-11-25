import { combineReducers } from 'redux';
import FeedReducer from './reducer_feed';
import AuthReducer from './reducer_auth';
import UserReducer from './reducer_user';
import ChatReducer from './reducer_chat';
import CourseTableReducer from './reducer_coursetable';

const rootReducer = combineReducers({
    feeds: FeedReducer,
    auth: AuthReducer,
    users: UserReducer,
    chats: ChatReducer,
    coursetable: CourseTableReducer
});

export default rootReducer;
