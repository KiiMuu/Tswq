import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../../components/product/Product';

const HomeScreen = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get('/api/products');

            setProducts(data);
        }

        getProducts();
    }, []);

    return (
        <Fragment>
            <div className="mt-12">
                <h1 className="mb-5 text-defaultSize uppercase text-gray-800">Latest products</h1>
                <div className="flex flex-wrap -mx-4">
                    {products.map(product => (
                        <Product product={product} key={product._id} />
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default HomeScreen;
