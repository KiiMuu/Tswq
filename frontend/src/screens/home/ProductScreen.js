import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineReply } from 'react-icons/hi';
import Rating from '../../components/product/Rating';
import products from '../../products';

const ProductScreen = ({ match }) => {

    const pro = products.find(p => p._id === match.params.id);

    return (
        <Fragment>
            <div className="mt-12 mb-5 text-defaultSize">
                <Link to='/' className="bg-gray-100 shadow-sm text-primary inline-block rounded-full p-3" title="Go back">
                    <HiOutlineReply />
                </Link>
            </div>
            
            <div className="text-defaultSize flex flex-wrap -mx-4">
                <div className="w-full md:w-3/6 md:mb-0 mb-8 px-4">
                    <img src={pro.image} alt={pro.name} className="rounded-md shadow-lg" />
                </div>
                <div className="relative w-full md:w-3/6 bg-white shadow-lg md:mb-0 mb-8 rounded-md p-8">
                    <h2 className="text-gray-800 text-4xl block leading-normal mb-5">{pro.name}</h2>
                    <Rating rating={pro.rating} text={`${pro.numReviews} reviews`} />
                    <span className="absolute right-0 top-0 bg-green-200 text-primary-dark py-1 px-4 rounded-none text-fontMed">${pro.price}</span>
                    <p className="leading-relaxed text-gray-500 mt-5">{pro.description}</p>
                </div>
                <div className="w-full md:w-3/6 mt-5 px-4">
                    <div className="p-8 border-4 shadow-lg bg-white border-gray-300 border-opacity-25">
                        <span className="block">
                            <span className="underline">Price</span>: ${pro.price}
                        </span>
                        <span className="block mt-2">
                            <span className="underline">Status:</span> {pro.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <button 
                            className="bg-primary text-white py-3 px-6 rounded-md focus:outline-none focus:ring focus:border-blue-300 mt-5 text-fontMed"
                            type="button" 
                            disabled={pro.countInStock === 0}
                        >Add to Cart</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductScreen;
