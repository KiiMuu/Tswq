import { Fragment } from 'react';
import products from '../../products';
import Product from '../../components/product/Product';

const HomeScreen = () => {
    return (
        <Fragment>
            <h1>Latest products</h1>
            <div className="flex items-stretch flex-wrap -mx-4">
                {products.map(product => (
                    <Product product={product} key={product._id} />
                ))}
            </div>
        </Fragment>
    )
}

export default HomeScreen;
