import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/layout/spinner/Spinner';
import { getSingleProduct, updateProduct } from '../../actions/productActions';
import Alert from '../../components/layout/alert/Alert';
import { HiOutlineExclamationCircle, HiOutlineReply } from 'react-icons/hi';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

const ProductEditScreen = () => {
	const { id } = useParams();
	const history = useHistory();

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { error, loading, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		error: errorUpdate,
		loading: loadingUpdate,
		success: successUpdate,
	} = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });

			history.push('/admin/products');
		} else {
			if (!product.name || product._id !== id) {
				dispatch(getSingleProduct(id));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [product, dispatch, id, history, successUpdate]);

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(
			updateProduct({
				_id: id,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		);
	};

	return (
		<Fragment>
			<div className="mt-12 mb-5 text-defaultSize">
				<Link
					to="/admin/products"
					className="bg-gray-100 shadow-sm text-primary inline-block rounded-full p-3"
					title="Back to products"
				>
					<HiOutlineReply />
				</Link>
			</div>
			<div className="text-defaultSize">
				<div className="flex justify-center -mx-4">
					<div className="w-full md:w-3/6 px-4">
						<h1 className="uppercase font-extrabold">
							Edit product
						</h1>
						{loadingUpdate && <Spinner />}
						{errorUpdate && (
							<Alert
								icon={<HiOutlineExclamationCircle />}
								content={errorUpdate}
								type="danger"
							/>
						)}
						{loading ? (
							<Spinner />
						) : error ? (
							<Alert
								icon={<HiOutlineExclamationCircle />}
								content={error}
								type="danger"
							/>
						) : (
							<form onSubmit={handleSubmit} noValidate>
								<div className="mb-5">
									<input
										className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
										type="text"
										inputMode="text"
										placeholder="Type your name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</div>
								<div className="mb-5">
									<input
										className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
										type="number"
										inputMode="number"
										placeholder="Type price"
										value={price}
										onChange={(e) =>
											setPrice(e.target.value)
										}
									/>
								</div>
								<div className="mb-5">
									<input
										className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
										type="text"
										inputMode="text"
										placeholder="Type image url"
										value={image}
										onChange={(e) =>
											setImage(e.target.value)
										}
									/>
								</div>
								<div className="mb-5">
									<input
										className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
										type="text"
										inputMode="text"
										placeholder="Type brand"
										value={brand}
										onChange={(e) =>
											setBrand(e.target.value)
										}
									/>
								</div>
								<div className="mb-5">
									<input
										className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
										type="number"
										inputMode="number"
										placeholder="Type count in stock"
										value={countInStock}
										onChange={(e) =>
											setCountInStock(e.target.value)
										}
									/>
								</div>
								<div className="mb-5">
									<input
										className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
										type="text"
										inputMode="text"
										placeholder="Type category"
										value={category}
										onChange={(e) =>
											setCategory(e.target.value)
										}
									/>
								</div>
								<div className="mb-5">
									<input
										className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
										type="text"
										inputMode="text"
										placeholder="Type description"
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
									/>
								</div>
								<button
									type="submit"
									className="w-full mt-5 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
									onClick={handleSubmit}
								>
									{loadingUpdate ? <Spinner /> : 'Save'}
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductEditScreen;
