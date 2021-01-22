import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_RESET,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
} from '../constants/productConstants';

const initialListState = {
	products: [],
};

export const productListReducer = (state = initialListState, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return {
				products: [],
				loading: true,
			};
		case PRODUCT_LIST_SUCCESS:
			return {
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page,
				loading: false,
			};
		case PRODUCT_LIST_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const initialDetailsState = {
	product: {
		reviews: [],
	},
};

export const productDetailsReducer = (state = initialDetailsState, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				product: {},
				...state,
				loading: true,
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				product: action.payload,
				loading: false,
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const initialproductDeleteState = {};

export const productDeleteReducer = (
	state = initialproductDeleteState,
	action
) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_DELETE_SUCCESS:
			return {
				success: true,
				loading: false,
			};
		case PRODUCT_DELETE_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const initialproductCreateState = {};

export const productCreateReducer = (
	state = initialproductCreateState,
	action
) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_CREATE_SUCCESS:
			return {
				product: action.payload,
				success: true,
				loading: false,
			};
		case PRODUCT_CREATE_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		case PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

const initialproductUpdateState = {
	product: {},
};

export const productUpdateReducer = (
	state = initialproductUpdateState,
	action
) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_UPDATE_SUCCESS:
			return {
				product: action.payload,
				success: true,
				loading: false,
			};
		case PRODUCT_UPDATE_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		case PRODUCT_UPDATE_RESET:
			return {
				product: {},
			};
		default:
			return state;
	}
};

const initialproductReviewState = {};

export const productReviewReducer = (
	state = initialproductReviewState,
	action
) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				success: true,
				loading: false,
			};
		case PRODUCT_CREATE_REVIEW_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		case PRODUCT_CREATE_REVIEW_RESET:
			return {
				product: {},
			};
		default:
			return state;
	}
};

const initialproductTopState = {
	products: [],
};

export const productTopReducer = (state = initialproductTopState, action) => {
	switch (action.type) {
		case PRODUCT_TOP_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case PRODUCT_TOP_SUCCESS:
			return {
				products: action.payload,
				loading: false,
			};
		case PRODUCT_TOP_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
