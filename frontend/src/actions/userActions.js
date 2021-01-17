import axios from 'axios';
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

export const signup = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        console.log(err);
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: err.response?.data.message ? err.response.data.message : err.message
        });
    }
}

export const signin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/signin', { email, password }, config);

        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        console.log(err);
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: err.response?.data.message ? err.response.data.message : err.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');

    dispatch({
        type: USER_LOGOUT
    });
}

// getState => for get token. we can get user info from getState which has the token
export const getUserDetails = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        // 2 levels of destructuring => userLogin > userInfo > token
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                // pass token as authorization for this endpoint
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response?.data.message ? err.response.data.message : err.message
        });
    }
}