import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from '../constants/userConstants';

const initialSigninState = {}

export const userSigninReducer = (state = initialSigninState, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {
                loading: true
            }
        case USER_SIGNIN_SUCCESS:
            return {
                userInfo: action.payload,
                loading: false
            }
        case USER_SIGNIN_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

const initialSignupState = {}

export const userSignupReducer = (state = initialSignupState, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return {
                loading: true
            }
        case USER_SIGNUP_SUCCESS:
            return {
                userInfo: action.payload,
                loading: false
            }
        case USER_SIGNUP_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

const initialUserDetailsState = {
    user: {}
}

export const userDetailsReducer = (state = initialUserDetailsState, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_DETAILS_SUCCESS:
            return {
                user: action.payload,
                loading: false
            }
        case USER_DETAILS_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}