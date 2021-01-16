import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Navbar from './components/layout/navbar/Navbar';
import HomeScreen from './screens/home/HomeScreen';
import ProductScreen from './screens/product/ProductScreen';
import CartScreen from './screens/cart/CartScreen';
import Footer from './components/layout/footer/Footer';
import SignupScreen from './screens/auth/SignupScreen';
import SigninScreen from './screens/auth/SigninScreen';

const App = () => {
    return (
        <Router>
            <Navbar />
            <main className="container">
                <Route path='/signup' component={SignupScreen} />
                <Route path='/signin' component={SigninScreen} />
                <Route path='/product/:id' component={ProductScreen} />
                <Route path='/cart/:id?' component={CartScreen} />
                <Route exact path='/' component={HomeScreen} />
            </main>
            <Footer />
        </Router>
    );
}

export default App;
