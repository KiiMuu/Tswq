import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Product.module.scss';
import { 
    HiOutlineReply, 
    HiOutlineShoppingCart,
    HiOutlineExclamationCircle, 
} from 'react-icons/hi';
import Rating from '../../components/product/Rating';
import Alert from '../../components/layout/alert/Alert';
import { getSingleProduct } from '../../actions/productActions';
import ProductSkeleton from '../../skeletons/ProductSkeleton';

const ProductScreen = ({ match }) => {

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(getSingleProduct(match.params.id));
    }, [dispatch, match]);

    return (
        <Fragment>
            <div className="mt-12 mb-5 text-defaultSize">
                <Link 
                    to='/' 
                    className={`${styles['back_btn']} bg-gray-100 shadow-sm text-primary inline-block rounded-full p-3`} 
                    title="Go back">
                    <HiOutlineReply />
                </Link>
            </div>
            {loading ? (
                <ProductSkeleton />
            ) : 
            error ? (
                <Alert
                    icon={<HiOutlineExclamationCircle />}
                    content={error} 
                    type="danger"
                />
            ) : (
                <div className="text-defaultSize flex flex-wrap -mx-4">
                    <div className="w-full md:w-3/6 md:mb-0 mb-8 px-4">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="rounded-md shadow-lg" 
                        />
                    </div>
                    <div className="relative w-full md:w-3/6 bg-white shadow-lg md:mb-0 mb-8 rounded-md p-12">
                        <h2 className="text-gray-800 text-4xl block leading-normal mb-5">{product.name}</h2>
                        <Rating 
                            rating={product.rating} 
                            text={`${product.numReviews} reviews`} 
                        />
                        <span className="absolute right-0 top-0 bg-blue-200 text-primary-dark py-1 px-4 rounded-none text-fontMed">${product.price}</span>
                        <p className="leading-relaxed text-gray-500 mt-5">{product.description}</p>
                    </div>
                    <div className="w-full md:w-3/6 mt-5 px-4">
                        <div className="mt-5 bg-white p-12 shadow-lg relative">
                            <div className="flex">
                                <span className="absolute right-0 top-0 bg-blue-200 text-primary-dark p-4 rounded-none text-fontMed"><HiOutlineShoppingCart className="text-3xl" /></span>
                                <span className="bg-gray-100 text-primary-dark p-4 rounded-md mr-3">
                                    <span className="font-semibold">Price</span>: ${product.price}
                                </span>
                                <span className="bg-gray-100 text-primary-dark p-4 rounded-md">
                                    <span className="font-semibold">Status:</span> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <button 
                                className={`${styles['product_btn']} block mt-8 text-fontMed`}
                                type="button" 
                                disabled={product.countInStock === 0}>
                                <span>
                                    Add to Cart 
                                    <HiOutlineShoppingCart className={styles['icon']} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ProductScreen;
