import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../components/product/Product';
import { getAllProducts } from '../../actions/productActions';
import ProductsSkeleton from '../../skeletons/ProductsSkeleton';
import Alert from '../../components/layout/alert/Alert';
import Paginate from '../../components/layout/pagination/Paginate';
import {
	HiOutlineExclamationCircle,
	HiOutlineInformationCircle,
} from 'react-icons/hi';
import TopProductsScreen from '../products/TopProductsScreen';

const HomeScreen = () => {
	const { searchTerm } = useParams();
	const { pageNumber } = useParams() || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(getAllProducts(searchTerm, pageNumber));
	}, [dispatch, searchTerm, pageNumber]);

	return (
		<Fragment>
			{!searchTerm && <TopProductsScreen />}
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
					<Fragment>
						<div className="flex flex-wrap -mx-4">
							{products.map((product) => (
								<Product product={product} key={product._id} />
							))}
						</div>
						<Paginate
							pages={pages}
							page={page}
							searchTerm={searchTerm ? searchTerm : ''}
						/>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

export default HomeScreen;
