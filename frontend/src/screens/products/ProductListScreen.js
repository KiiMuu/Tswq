import { Fragment, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/layout/alert/Alert';
import Spinner from '../../components/layout/spinner/Spinner';
import {
	getAllProducts,
	deleteProduct,
	createProduct,
} from '../../actions/productActions';
import {
	HiOutlineTrash,
	HiOutlineInformationCircle,
	HiOutlinePencil,
} from 'react-icons/hi';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';
import Paginate from '../../components/layout/pagination/Paginate';

const ProductListScreen = () => {
	const history = useHistory();
	const { pageNumber } = useParams() || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		success: successDelete,
		loading: loadingDelete,
		error: errorDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		success: successCreate,
		loading: loadingCreate,
		error: errorCreate,
		product: createdProduct,
	} = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo.isAdmin) {
			history.push('/signin');
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(getAllProducts('', pageNumber));
		}
	}, [
		dispatch,
		userInfo,
		history,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	const handleCreateProduct = () => {
		dispatch(createProduct());
	};

	const handleProductDelete = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};

	const productsRecords = () =>
		products.map((product) => (
			<tr key={product._id}>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">{product._id}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">{product.name}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">${product.price}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">{product.category}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">{product.brand}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-right">
					<Link to={`/admin/product/${product._id}/edit`}>
						<button
							className="bg-gray-200 rounded-full p-3 focus:outline-none focus:ring focus:border-blue-300"
							type="button"
						>
							<HiOutlinePencil className="w-8 h-8 text-gray-600" />
						</button>
					</Link>
					<button
						className="bg-gray-200 rounded-full p-3 focus:outline-none focus:ring focus:border-blue-300 ml-4"
						type="button"
						onClick={() => handleProductDelete(product._id)}
					>
						<HiOutlineTrash className="w-8 h-8 text-red-600" />
					</button>
				</td>
			</tr>
		));

	return (
		<div className="mt-12">
			<div className="flex justify-between">
				<di>
					<h1 className="text-defaultSize uppercase text-gray-800 py-3 px-0">
						Products
					</h1>
				</di>
				<div>
					<button
						className="bg-primary text-white rounded py-3 px-6 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
						onClick={handleCreateProduct}
					>
						Create
					</button>
				</div>
			</div>

			{loadingDelete && <Spinner />}
			{errorDelete && (
				<Alert
					icon={<HiOutlineInformationCircle />}
					content={errorDelete}
					type="danger"
				/>
			)}

			{loadingCreate && <Spinner />}
			{errorCreate && (
				<Alert
					icon={<HiOutlineInformationCircle />}
					content={errorCreate}
					type="danger"
				/>
			)}

			{loading ? (
				<Spinner />
			) : error ? (
				<Alert
					icon={<HiOutlineInformationCircle />}
					content={error}
					type="danger"
				/>
			) : products?.length === 0 ? (
				<Alert
					icon={<HiOutlineInformationCircle />}
					content="No products"
					type="normal"
				/>
			) : (
				<Fragment>
					<div className="flex flex-col text-fontMed mb-5">
						<div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
							<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
								<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Id
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Name
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Price
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Category
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Brand
												</th>
												<th
													scope="col"
													class="relative px-6 py-3"
												>
													<span class="sr-only">
														Delete
													</span>
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{productsRecords()}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</Fragment>
			)}
		</div>
	);
};

export default ProductListScreen;
