import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    PROFILE_LOADED_SUCCESS,
    PROFILE_LOADED_FAIL,
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
    PROFILE_UPDATED_SUCCESS,
    PROFILE_UPDATED_FAIL,
    RESEND_EMAIL_SUCCESS,
    RESEND_EMAIL_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    profileData: null,
    failed: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case PROFILE_LOADED_SUCCESS:
            return {
                ...state,
                profileData: payload,
                updateSuccess: false
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case PROFILE_LOADED_FAIL:
            return {
                ...state,
                profileData: null,
                updateSuccess: false
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: null,
                user: null,
                profileData: null,
                failed: true,
                updateSuccess: false
            }
        case PROFILE_UPDATED_SUCCESS:
            return {
                ...state,
                profileData: payload,
                updateSuccess: true
            }
        case PROFILE_UPDATED_FAIL:
            return {
                ...state,
                profileData: payload,
                updateSuccess: false
            }
        case SIGNUP_FAIL:
        case DELETE_USER_SUCCESS:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: null,
                profileData: null,
                user: null,
                updateSuccess: false
            }
        case CHANGE_PASSWORD_FAIL:
        case CHANGE_PASSWORD_SUCCESS:
        case RESEND_EMAIL_SUCCESS:
        case RESEND_EMAIL_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case DELETE_USER_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}