import axios from "axios";
import {
    COMMENT_ADDED_SUCCESS,
    COMMENT_ADDED_FAIL,
    COMMENT_EDITED_SUCCESS,
    COMMENT_EDITED_FAIL,
    COMMENT_DELETED_SUCCESS,
    COMMENT_DELETED_FAIL
} from './types';

export const sendNewCommentToServer = (commentData, slug, renderWholePage) => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            console.log('hello')
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/comments/create/` + slug + '/', commentData, config)
            renderWholePage()
            dispatch({
                type: COMMENT_ADDED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: COMMENT_ADDED_FAIL
            })
        } 
    } else {
        dispatch({
            type: COMMENT_ADDED_FAIL
        })
    }
}