import {
    POST_ADDED_SUCCESS,
    POST_ADDED_FAIL
} from '../actions/types';

const initialState = {
    postAdded: false,
    post: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case POST_ADDED_SUCCESS:
            return {
                ...state,
                postAdded: true,
                post: payload
            }
        case POST_ADDED_FAIL:
            return {
                ...state,
                postAdded: false,
                post: null
            }
        default:
            return state
    }
}