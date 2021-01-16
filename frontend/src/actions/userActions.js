import axios from 'axios';
import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT
} from '../constants/userConstants';

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