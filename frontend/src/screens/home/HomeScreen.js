import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../components/product/Product';
import { getAllProducts } from '../../actions/productActions';
import ProductSkeleton from '../../skeletons/ProductSkeleton';
import Alert from '../../components/layout/alert/Alert';
import { 
    HiOutlineExclamationCircle, 
    HiOutlineInformationCircle
} from 'react-icons/hi';

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
                    <div className="flex flex-wrap -mx-4">
                        {[...Array(6)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <Alert
                        icon={<HiOutlineExclamationCircle />}
                        content={error} 
                        type="normal" 
                    />
                ) : (
                    products?.length === 0 ? (
                        <Alert
                            icon={<HiOutlineInformationCircle />}
                            content="There aren't any products yet." 
                            type="normal" 
                        />
                    ) : (
                        <div className="flex flex-wrap -mx-4">
                            {products.map(product => (
                                <Product product={product} key={product._id} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </Fragment>
    )
}

export default HomeScreen;
