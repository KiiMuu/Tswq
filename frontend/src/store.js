import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
	userSigninReducer,
	userSignupReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	userOrdersReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
	// product
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	// cart
	cart: cartReducer,
	// user
	userLogin: userSigninReducer,
	userRegister: userSignupReducer,
	userDetails: userDetailsReducer,
	updateUser: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	// order
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	userOrders: userOrdersReducer,
});

const cartItemsFromLS = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromLS = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const shippingAddressFromLS = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

// cart items, user token or whatever can be here
const initialState = {
	cart: {
		cartItems: cartItemsFromLS,
		shippingAddress: shippingAddressFromLS,
	},
	userLogin: { userInfo: userInfoFromLS },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
