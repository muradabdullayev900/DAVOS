import {
    COMMENT_ADDED_SUCCESS,
    COMMENT_ADDED_FAIL,
    COMMENT_EDITED_SUCCESS,
    COMMENT_EDITED_FAIL,
    COMMENT_DELETED_SUCCESS,
    COMMENT_DELETED_FAIL
} from '../actions/types';

const initialState = {
    commentAdded: false,
    comment: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case COMMENT_ADDED_SUCCESS:
            return {
                ...state,
                commentAdded: true,
                comment: payload
            }
        case COMMENT_ADDED_FAIL:
            return {
                ...state,
                commentAdded: false,
                comment: null
            }
    }
}