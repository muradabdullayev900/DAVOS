import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,
    PROFILE_LOADED_FAIL,
    PROFILE_LOADED_SUCCESS,
    PROFILE_UPDATED_FAIL,
    PROFILE_UPDATED_SUCCESS,
    RESEND_EMAIL_SUCCESS,
    RESEND_EMAIL_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL
} from './types';


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem('access')})
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        } 
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(load_user());
        return res.data
    }
    catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        return err.response.data
    }
};

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        return res.data
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
        return err.response.data
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }   
}

export const resend_email = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/resend_activation/`, body, config);

        dispatch({
            type: RESEND_EMAIL_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: RESEND_EMAIL_FAIL
        });
    }   
}

export const set_password = (new_password, re_new_password, current_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    const body = JSON.stringify({ new_password, re_new_password, current_password });
    console.log(body)

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/set_password/`, body, config);
        console.log(res.data)
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS
        });
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            payload: err.response.data
        });
    }   
}

export const delete_user = (current_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    const body = JSON.stringify({ current_password });

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config);
        
        console.log(res.data)

        dispatch({
            type: DELETE_USER_SUCCESS
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: DELETE_USER_FAIL,
        });
    }   
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    window.location.reload()
}

export const fetchUserProfile = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, config)
            dispatch({
                type: PROFILE_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PROFILE_LOADED_FAIL
            })
        } 
    } else {
        dispatch({
            type: PROFILE_LOADED_FAIL
        })
    }
}

export const updateUserProfile = (data) => async dispatch => {
    if (localStorage.getItem('access')) {
        let form_data = new FormData();
        if (data.image)
            form_data.append("image", data.image, 
            data.image.name);
        form_data.append("first_name", data.first_name);
        form_data.append("last_name", data.last_name);
        form_data.append("email", data.email);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        }
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/profile`, form_data, config)
            dispatch({
                type: PROFILE_UPDATED_SUCCESS,
            })
        } catch (err) {
            dispatch({
                type: PROFILE_UPDATED_FAIL
            })
        } 
    } else {
        dispatch({
            type: PROFILE_LOADED_FAIL
        })
    }
}