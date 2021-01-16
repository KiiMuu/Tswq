import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import { 
    productListReducer,
    productDetailsReducer
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer } from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userSigninReducer
});

const cartItemsFromLS = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromLS = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// cart items, user token or whatever can be here
const initialState = {
    cart: { cartItems: cartItemsFromLS },
    userLogin: { userInfo: userInfoFromLS },
}

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;