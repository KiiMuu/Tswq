import { Fragment, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/layout/alert/Alert';
import Spinner from '../../components/layout/spinner/Spinner';
import { getAllProducts } from '../../actions/productActions';
import {
	HiOutlineTrash,
	HiOutlineInformationCircle,
	HiOutlineCheckCircle,
	HiOutlinePencil,
	HiOutlineXCircle,
} from 'react-icons/hi';

const ProductListScreen = () => {
	const history = useHistory();
	const { id } = useParams();

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getAllProducts());
		} else {
			history.push('/signin');
		}
	}, [dispatch, userInfo, history]);

	const handleCreateProduct = (product) => {};

	const handleProductDelete = (id) => {
		if (window.confirm('Are you sure?')) {
			// TO DO
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
					<div className="flex flex-col text-fontMed">
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
				</Fragment>
			)}
		</div>
	);
};

export default ProductListScreen;
