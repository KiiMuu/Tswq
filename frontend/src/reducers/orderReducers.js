import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS
} from '../constants/orderConstants';

const initialOrderState = {}

export const orderCreateReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                order: action.payload,
                success: true,
                loading: false
            }
        case ORDER_CREATE_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}