import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import styles from './Product.module.scss';
import {
	HiOutlineReply,
	HiOutlineShoppingCart,
	HiOutlineExclamationCircle,
} from 'react-icons/hi';
import Rating from '../../components/product/Rating';
import Alert from '../../components/layout/alert/Alert';
import Spinner from '../../components/layout/spinner/Spinner';
import {
	getSingleProduct,
	createProductReview,
} from '../../actions/productActions';
import ProductSkeleton from '../../skeletons/ProductSkeleton';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';

const ProductScreen = () => {
	const { id } = useParams();
	const history = useHistory();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productReview = useSelector((state) => state.productReview);
	const {
		error: errorRev,
		success: successRev,
		loading: loadingRev,
	} = productReview;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successRev) {
			alert('Review added');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(getSingleProduct(id));
	}, [dispatch, id, successRev]);

	const handleChange = (e) => setQty(e.target.value);

	const handleAddToCart = () => {
		history.push(`/cart/${id}?qty=${qty}`);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(
			createProductReview(id, {
				rating,
				comment,
			})
		);
	};

	return (
		<Fragment>
			<div className="mt-12 mb-5 text-defaultSize">
				<Link
					to="/"
					className={`${styles['back_btn']} bg-gray-100 shadow-sm text-primary inline-block rounded-full p-3`}
					title="Go back"
				>
					<HiOutlineReply />
				</Link>
			</div>
			{loading ? (
				<ProductSkeleton />
			) : error ? (
				<Alert
					icon={<HiOutlineExclamationCircle />}
					content={error}
					type="danger"
				/>
			) : (
				<div className="text-defaultSize flex flex-wrap -mx-4">
					<div className="w-full md:w-3/6 md:mb-0 mb-5 px-4">
						<img
							src={product.image}
							alt={product.name}
							className="rounded-md shadow-lg"
						/>
					</div>
					<div className="flex w-full md:w-3/6 px-4">
						<div className="relative bg-white shadow-md rounded-md p-12">
							<h2 className="text-gray-800 text-4xl block leading-normal mb-5">
								{product.name}
							</h2>
							<Rating
								rating={product.rating}
								text={`${product.numReviews} reviews`}
							/>
							<span className="absolute right-0 top-0 bg-blue-200 text-primary-dark py-1 px-4 rounded-none text-fontMed">
								${product.price}
							</span>
							<p className="leading-relaxed text-gray-500 mt-5">
								{product.description}
							</p>
						</div>
					</div>
					<div className="w-full md:w-3/6 px-4">
						<div className="mt-5 relative bg-white shadow-md rounded-md p-12">
							<span className="absolute right-0 top-0 bg-blue-200 text-primary-dark p-4 rounded-none text-fontMed">
								<HiOutlineShoppingCart className="text-3xl" />
							</span>
							<span className="bg-gray-100 text-primary-dark p-4 rounded-md mr-3">
								<span className="font-semibold">Price</span>: $
								{product.price}
							</span>
							<span className="bg-gray-100 text-primary-dark p-4 rounded-md">
								<span className="font-semibold">Status:</span>{' '}
								{product.countInStock > 0
									? 'In Stock'
									: 'Out of Stock'}
							</span>
							{product.countInStock > 0 && (
								<div className="block mt-10">
									<label className="mr-5">Quantity:</label>
									<select
										className="focus:outline-none focus:ring focus:border-blue-300 cursor-pointer bg-gray-100"
										value={qty}
										onChange={handleChange}
									>
										{[
											...Array(
												product.countInStock
											).keys(),
										].map((x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}
											</option>
										))}
									</select>
								</div>
							)}
							<button
								className={`${
									product.countInStock === 0
										? styles['disabled']
										: ''
								} ${
									styles['product_btn']
								} block mt-8 text-fontMed`}
								type="button"
								onClick={handleAddToCart}
								disabled={product.countInStock === 0}
							>
								<span>
									Add to Cart
									<HiOutlineShoppingCart
										className={styles['icon']}
									/>
								</span>
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="text-defaultSize mt-12">
				<div className="flex justify-start -mx-4">
					<div className="w-full md:w-3/6 px-4">
						<h1>Reviews</h1>
						{product.reviews.length === 0 && (
							<Alert
								icon={<HiOutlineExclamationCircle />}
								content="No reviews on this product"
								type="normal"
							/>
						)}

						{product.reviews.map((rev) => (
							<div
								key={rev._id}
								className="bg-gray-50 p-6 rounded mb-3"
							>
								<h2 className="block mb-2 font-extrabold">
									{rev.name}
								</h2>
								<Rating rating={rev.rating} />
								<span className="block text-gray-600">
									{rev.createdAt.substring(0, 10)}
								</span>
								<p className="text-gray-900 mt-5">
									{rev.comment}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="text-defaultSize mt-12">
				<div className="flex justify-start -mx-4">
					<div className="w-full md:w-3/6 px-4">
						<h1 className="uppercase font-extrabold">Add review</h1>
						{errorRev && (
							<div className="mb-3">
								<Alert
									icon={<HiOutlineExclamationCircle />}
									content={errorRev}
									type="danger"
								/>
							</div>
						)}
						{userInfo ? (
							<form onSubmit={handleSubmit} noValidate>
								<div className="mb-5">
									<select
										className="focus:outline-none focus:ring focus:border-blue-300 cursor-pointer bg-gray-50"
										value={rating}
										onChange={(e) =>
											setRating(e.target.value)
										}
									>
										<option value="">Select rating</option>
										<option value="1">1 - Poor</option>
										<option value="2">2 - Fair</option>
										<option value="3">3 - Good</option>
										<option value="4">4 - Very Good</option>
										<option value="5">5 - Excellent</option>
									</select>
								</div>
								<div className="mb-5">
									<input
										className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
										type="text"
										inputMode="text"
										placeholder="Type your comment"
										value={comment}
										onChange={(e) =>
											setComment(e.target.value)
										}
									/>
								</div>
								<button
									type="submit"
									className="w-full mt-2 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
									onClick={handleSubmit}
								>
									{loadingRev ? <Spinner /> : 'Add'}
								</button>
							</form>
						) : (
							<Alert
								icon={<HiOutlineExclamationCircle />}
								content="Please signin first"
								type="normal"
							/>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductScreen;
