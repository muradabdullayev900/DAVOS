import { combineReducers } from "redux";
import auth from './auth';
import post from './post';
import comment from './comment';

export default combineReducers({
    auth, post, comment
})