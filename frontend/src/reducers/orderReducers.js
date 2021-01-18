import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
} from '../constants/orderConstants';

const initialOrderState = {};

export const orderCreateReducer = (state = initialOrderState, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			};
		case ORDER_CREATE_SUCCESS:
			return {
				order: action.payload,
				success: true,
				loading: false,
			};
		case ORDER_CREATE_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const initialOrderDetailsState = {
	orderItems: [],
	shippingAddress: {},
	loading: true,
};

export const orderDetailsReducer = (
	state = initialOrderDetailsState,
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_DETAILS_SUCCESS:
			return {
				order: action.payload,
				loading: false,
			};
		case ORDER_DETAILS_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const initialOrderPayState = {};

export const orderPayReducer = (state = initialOrderPayState, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			};
		case ORDER_PAY_SUCCESS:
			return {
				success: true,
				loading: false,
			};
		case ORDER_PAY_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};