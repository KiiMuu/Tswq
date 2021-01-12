import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../components/product/Product';
import { getAllProducts } from '../../actions/productActions';

const HomeScreen = () => {
    
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="mt-12">
                <h1 className="mb-5 text-defaultSize uppercase text-gray-800">Latest products</h1>
                {loading ? (
                    <span>Loading...</span>
                ) : error ? (
                    <span>{error}</span>
                ) : (
                    <div className="flex flex-wrap -mx-4">
                        {products.map(product => (
                            <Product product={product} key={product._id} />
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default HomeScreen;
