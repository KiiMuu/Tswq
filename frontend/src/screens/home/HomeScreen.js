import { Fragment } from 'react';
import products from '../../products';
import Product from '../../components/product/Product';

const HomeScreen = () => {
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
