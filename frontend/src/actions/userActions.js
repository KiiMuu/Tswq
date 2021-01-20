import axios from 'axios';
import { ORDER_USER_LIST_RESET } from '../constants/orderConstants';
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
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
} from '../constants/userConstants';

export const signup = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_SIGNUP_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		);

		dispatch({
			type: USER_SIGNUP_SUCCESS,
			payload: data,
		});

		dispatch({
			type: USER_SIGNIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		console.log(err);
		dispatch({
			type: USER_SIGNUP_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const signin = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_SIGNIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/signin',
			{ email, password },
			config
		);

		dispatch({
			type: USER_SIGNIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		console.log(err);
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo');

	dispatch({
		type: USER_LOGOUT,
	});
	dispatch({
		type: USER_DETAILS_FAIL,
	});
	dispatch({
		type: ORDER_USER_LIST_RESET,
	});
	dispatch({
		type: USER_LIST_RESET,
	});
};

// getState => for get token. we can get user info from getState which has the token
export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		// 2 levels of destructuring => userLogin > userInfo > token
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				// pass token as authorization for this endpoint
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users/${id}`, config);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				// pass token as authorization for this endpoint
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/users/profile`, user, config);

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const getUserList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});

		// 2 levels of destructuring => userLogin > userInfo > token
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				// pass token as authorization for this endpoint
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users`, config);

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: USER_LIST_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				// pass token as authorization for this endpoint
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/users/${id}`, config);

		dispatch({
			type: USER_DELETE_SUCCESS,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: USER_DELETE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				// pass token as authorization for this endpoint
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/users/${user._id}`,
			user,
			config
		);

		dispatch({
			type: USER_UPDATE_SUCCESS,
		});

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: err.response?.data.message
				? err.response.data.message
				: err.message,
		});
	}
};
