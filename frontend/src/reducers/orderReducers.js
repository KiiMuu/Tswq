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
	ORDER_USER_LIST_REQUEST,
	ORDER_USER_LIST_SUCCESS,
	ORDER_USER_LIST_FAIL,
	ORDER_USER_LIST_RESET,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_RESET,
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

const initialUserOrdersState = {
	orders: [],
};

export const userOrdersReducer = (state = initialUserOrdersState, action) => {
	switch (action.type) {
		case ORDER_USER_LIST_REQUEST:
			return {
				loading: true,
			};
		case ORDER_USER_LIST_SUCCESS:
			return {
				orders: action.payload,
				loading: false,
			};
		case ORDER_USER_LIST_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		case ORDER_USER_LIST_RESET:
			return { orders: [] };
		default:
			return state;
	}
};

const initialOrderListState = {
	orders: [],
};

export const orderListReducer = (state = initialOrderListState, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return {
				loading: true,
			};
		case ORDER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			};
		case ORDER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const initialOrderDeliverState = {};

export const orderDeliverReducer = (
	state = initialOrderDeliverState,
	action
) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return {
				loading: true,
			};
		case ORDER_DELIVER_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDER_DELIVER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDER_DELIVER_RESET:
			return {};
		default:
			return state;
	}
};
