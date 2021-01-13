import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Navbar from './components/layout/navbar/Navbar';
import HomeScreen from './screens/home/HomeScreen';
import ProductScreen from './screens/product/ProductScreen';
import CartScreen from './screens/cart/CartScreen';
import Footer from './components/layout/footer/Footer';

const App = () => {
    return (
        <Router>
            <Navbar />
            <main className="container">
                <Route exact path='/' component={HomeScreen} />
                <Route path='/product/:id' component={ProductScreen} />
                <Route path='/cart/:id?' component={CartScreen} />
            </main>
            <Footer />
        </Router>
    );
}

export default App;
