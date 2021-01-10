import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Navbar from './components/layout/navbar/Navbar';
import HomeScreen from './screens/home/HomeScreen';
import ProductScreen from './screens/home/ProductScreen';
import Footer from './components/layout/footer/Footer';

const App = () => {
    return (
        <Router>
            <Navbar />
            <main className="container">
                <Route exact path='/' component={HomeScreen} />
                <Route path='/product/:id' component={ProductScreen} />
            </main>
            <Footer />
        </Router>
    );
}

export default App;
