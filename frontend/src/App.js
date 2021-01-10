import { Fragment } from 'react';

// components
import Navbar from './components/layout/navbar/Navbar';
import HomeScreen from './screens/home/HomeScreen';
import Footer from './components/layout/footer/Footer';

const App = () => {
    return (
        <Fragment>
            <Navbar />
            <main className="container">
                <HomeScreen />
            </main>
            <Footer />
        </Fragment>
    );
}

export default App;
