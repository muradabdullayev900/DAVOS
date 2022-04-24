import axios from 'axios';
import {
    POST_ADDED_SUCCESS,
    POST_ADDED_FAIL,
    POST_EDITED_SUCCESS,
    POST_EDITED_FAIL,
    POST_DELETED_SUCCESS,
    POST_DELETED_FAIL
} from './types';


export const sendNewPostToServer = (data) => async dispatch => {
    if (localStorage.getItem('access')) {
        console.log('data', data)
        let form_data = new FormData();
        console.log('image', data.image)
        if (data.image)
            form_data.append("image", data.image, data.image.name);
        form_data.append("title", data.title);
        form_data.append("content", data.content);
        console.log(form_data)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/create-new-post`, form_data, config)
            dispatch({
                type: POST_ADDED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: POST_ADDED_FAIL
            })
        } 
    } else {
        dispatch({
            type: POST_ADDED_FAIL
        })
    }
}

export const editPost = (postData) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/update-post`, postData, config)
            dispatch({
                type: POST_EDITED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: POST_EDITED_FAIL
            })
        } 
    } else {
        dispatch({
            type: POST_EDITED_FAIL
        })
    }
}

export const deletePost = (slug) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
            data: {
                slug: slug
            }
        };
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-post`, config)
            dispatch({
                type: POST_DELETED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: POST_DELETED_FAIL
            })
        } 
    } else {
        dispatch({
            type: POST_DELETED_FAIL
        })
    }
};