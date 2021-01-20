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
	USER_DETAILS_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_DETAILS_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
} from '../constants/userConstants';

const initialSigninState = {};

export const userSigninReducer = (state = initialSigninState, action) => {
	switch (action.type) {
		case USER_SIGNIN_REQUEST:
			return {
				loading: true,
			};
		case USER_SIGNIN_SUCCESS:
			return {
				userInfo: action.payload,
				loading: false,
			};
		case USER_SIGNIN_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

const initialSignupState = {};

export const userSignupReducer = (state = initialSignupState, action) => {
	switch (action.type) {
		case USER_SIGNUP_REQUEST:
			return {
				loading: true,
			};
		case USER_SIGNUP_SUCCESS:
			return {
				userInfo: action.payload,
				loading: false,
			};
		case USER_SIGNUP_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const initialUserDetailsState = {
	user: {},
};

export const userDetailsReducer = (state = initialUserDetailsState, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case USER_DETAILS_SUCCESS:
			return {
				user: action.payload,
				loading: false,
			};
		case USER_DETAILS_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		case USER_DETAILS_RESET:
			return { user: {} };
		default:
			return state;
	}
};

const initialUserUpdateProfileState = {};

export const userUpdateProfileReducer = (
	state = initialUserUpdateProfileState,
	action
) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return {
				loading: true,
			};
		case USER_UPDATE_PROFILE_SUCCESS:
			return {
				userInfo: action.payload,
				success: true,
				loading: false,
			};
		case USER_UPDATE_PROFILE_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const initialUserListState = {
	users: [],
};

export const userListReducer = (state = initialUserListState, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return {
				loading: true,
			};
		case USER_LIST_SUCCESS:
			return {
				users: action.payload,
				loading: false,
			};
		case USER_LIST_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		case USER_LIST_RESET:
			return {
				users: [],
			};
		default:
			return state;
	}
};

const initialUserDeleteState = {};

export const userDeleteReducer = (state = initialUserDeleteState, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return {
				loading: true,
			};
		case USER_DELETE_SUCCESS:
			return {
				success: true,
				loading: false,
			};
		case USER_DELETE_FAIL:
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
