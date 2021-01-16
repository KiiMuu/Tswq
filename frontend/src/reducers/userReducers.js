import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT
} from '../constants/userConstants';

const initialListState = {}

export const userSigninReducer = (state = initialListState, action) => {
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