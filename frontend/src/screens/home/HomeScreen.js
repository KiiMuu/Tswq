import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../components/product/Product';
import { getAllProducts } from '../../actions/productActions';
import ProductsSkeleton from '../../skeletons/ProductsSkeleton';
import Alert from '../../components/layout/alert/Alert';
import {
	HiOutlineExclamationCircle,
	HiOutlineInformationCircle,
} from 'react-icons/hi';

const HomeScreen = () => {
	const { searchTerm } = useParams();

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(getAllProducts(searchTerm));
	}, [dispatch, searchTerm]);

	return (
		<Fragment>
			<div className="mt-12">
				<h1 className="mb-5 text-defaultSize uppercase text-gray-800">
					Latest products
				</h1>

				{loading ? (
					<div className="flex flex-wrap -mx-4">
						{[...Array(6)].map((_, i) => (
							<ProductsSkeleton key={i} />
						))}
					</div>
				) : error ? (
					<Alert
						icon={<HiOutlineExclamationCircle />}
						content={error}
						type="normal"
					/>
				) : products?.length === 0 ? (
					<Alert
						icon={<HiOutlineInformationCircle />}
						content="No products"
						type="normal"
					/>
				) : (
					<div className="flex flex-wrap -mx-4">
						{products.map((product) => (
							<Product product={product} key={product._id} />
						))}
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default HomeScreen;
