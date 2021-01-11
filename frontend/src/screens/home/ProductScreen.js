import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Product.module.scss';
import { HiOutlineReply, HiOutlineShoppingCart } from 'react-icons/hi';
import Rating from '../../components/product/Rating';

const ProductScreen = ({ match }) => {

    const [product, setProduct] = useState({});

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`);

            setProduct(data);
        }

        getProduct();
    }, [match]);

    return (
        <Fragment>
            <div className="mt-12 mb-5 text-defaultSize">
                <Link to='/' className={`${styles['back_btn']} bg-gray-100 shadow-sm text-primary inline-block rounded-full p-3`} title="Go back">
                    <HiOutlineReply />
                </Link>
            </div>
            
            <div className="text-defaultSize flex flex-wrap -mx-4">
                <div className="w-full md:w-3/6 md:mb-0 mb-8 px-4">
                    <img src={product.image} alt={product.name} className="rounded-md shadow-lg" />
                </div>
                <div className="relative w-full md:w-3/6 bg-white shadow-lg md:mb-0 mb-8 rounded-md p-8">
                    <h2 className="text-gray-800 text-4xl block leading-normal mb-5">{product.name}</h2>
                    <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
                    <span className="absolute right-0 top-0 bg-blue-200 text-primary-dark py-1 px-4 rounded-none text-fontMed">${product.price}</span>
                    <p className="leading-relaxed text-gray-500 mt-5">{product.description}</p>
                </div>
                <div className="w-full md:w-3/6 mt-5 px-4">
                    <div className="p-8 border-4 shadow-lg bg-blue-200 border-blue-300 border-opacity-25">
                        <span className="block">
                            <span className="underline">Price</span>: ${product.price}
                        </span>
                        <span className="block mt-2">
                            <span className="underline">Status:</span> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <button 
                            className={`${styles['product_btn']} mt-8 text-fontMed`}
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
        </Fragment>
    )
}

export default ProductScreen;
