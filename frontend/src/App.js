import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Navbar from './components/layout/navbar/Navbar';
import HomeScreen from './screens/home/HomeScreen';
import ProductScreen from './screens/product/ProductScreen';
import CartScreen from './screens/cart/CartScreen';
import Footer from './components/layout/footer/Footer';
import SignupScreen from './screens/auth/SignupScreen';
import SigninScreen from './screens/auth/SigninScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import ShippingScreen from './screens/shipping/ShippingScreen';
import PaymentScreen from './screens/payment/PaymentScreen';
import PlaceOrderScreen from './screens/order/PlaceOrderScreen';
import OrderScreen from './screens/order/OrderScreen';
import UserListScreen from './screens/users/UserListScreen';
import UserEditScreen from './screens/users/UserEditScreen';
import ProductListScreen from './screens/products/ProductListScreen';
import ProductEditScreen from './screens/products/ProductEditScreen';

const App = () => {
	return (
		<Router>
			<Navbar />
			<main className="container">
				<Route
					path="/admin/product/:id/edit"
					component={ProductEditScreen}
				/>
				<Route path="/admin/products" component={ProductListScreen} />
				<Route path="/admin/user/:id/edit" component={UserEditScreen} />
				<Route path="/admin/users" component={UserListScreen} />
				<Route path="/order/:id" component={OrderScreen} />
				<Route path="/shipping" component={ShippingScreen} />
				<Route path="/payment" component={PaymentScreen} />
				<Route path="/placeorder" component={PlaceOrderScreen} />
				<Route path="/signup" component={SignupScreen} />
				<Route path="/signin" component={SigninScreen} />
				<Route path="/profile" component={ProfileScreen} />
				<Route path="/product/:id" component={ProductScreen} />
				<Route path="/cart/:id?" component={CartScreen} />
				<Route exact path="/" component={HomeScreen} />
			</main>
			<Footer />
		</Router>
	);
};

export default App;
