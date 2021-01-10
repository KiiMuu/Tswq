import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <div className="md:flex w-full sm:w-6/6 md:w-3/6 lg:w-2/6 mb-8 px-4">
            <div className="rounded-md overflow-hidden bg-white shadow-lg text-defaultSize">
                <a href={`/product/${product._id}`}>
                    <img
                        className="w-full h-96"
                        src={product.image} 
                        alt={product.name}
                    />
                </a>
                <div className="p-14">
                    <a href={`/product/${product._id}`} className="text-gray-800 mb-4 block text-3xl leading-10">
                        {product.name}
                    </a>
                    <h3 className="text-gray-500 mb-8">
                        <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
                    </h3>
                    <span className="bg-primary text-white py-2 px-5 rounded-md text-fontMed">
                        ${product.price}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Product;
