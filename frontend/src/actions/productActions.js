import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants';

// redux thunk comes here to make asynchronous requests
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get('/api/products');

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.response?.data.message ? err.response.data.message : err.message
        });
    }
}