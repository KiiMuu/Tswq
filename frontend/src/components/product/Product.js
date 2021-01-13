import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <div className="md:flex w-full md:w-3/6 lg:w-2/6 mb-8 px-4">
            <div className="rounded-md overflow-hidden bg-white shadow-md text-defaultSize">
                <Link to={`/product/${product._id}`}>
                    <img
                        className="w-full h-96"
                        src={product.image} 
                        alt={product.name}
                    />
                </Link>
                <div className="p-14">
                    <Link to={`/product/${product._id}`} className="text-gray-800 mb-4 block text-3xl leading-10">
                        {product.name}
                    </Link>
                    <h3 className="text-gray-500 mb-8">
                        <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
                    </h3>
                    <span className="bg-blue-200 text-primary-dark py-1 px-4 rounded-full text-fontMed">
                        ${product.price}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Product;
