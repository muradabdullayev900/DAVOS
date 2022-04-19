import {
    POST_ADDED_SUCCESS,
    POST_ADDED_FAIL,
    POST_EDITED_SUCCESS,
    POST_EDITED_FAIL,
    POST_DELETED_SUCCESS,
    POST_DELETED_FAIL
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
        case POST_EDITED_SUCCESS:
            return {
                ...state,
                postAdded: false,
                post: payload
            }
        case POST_EDITED_FAIL:
            return {
                ...state,
                postAdded: false,
                post: null
            }
        case POST_DELETED_SUCCESS:
            return {
                ...state,
                postAdded: false,
                post: payload
            }
        case POST_DELETED_FAIL:
            return {
                ...state,
                postAdded: false,
                post: null
            }
        default:
            return state
    }
}