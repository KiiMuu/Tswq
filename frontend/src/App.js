import { Fragment } from 'react';

// components
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';

const App = () => {
    return (
        <Fragment>
            <Navbar />
            <main className="container">
                Hi Tswq
            </main>
            <Footer />
        </Fragment>
    );
}

export default App;
