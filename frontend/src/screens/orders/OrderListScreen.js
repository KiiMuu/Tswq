import { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/layout/alert/Alert';
import Spinner from '../../components/layout/spinner/Spinner';
import { listOrders } from '../../actions/orderActions';
import { HiOutlineInformationCircle, HiOutlineXCircle } from 'react-icons/hi';

const OrderListScreen = () => {
	const history = useHistory();

	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			history.push('/signin');
		}
	}, [dispatch, userInfo, history]);

	const ordersRecords = () =>
		orders.map((order) => (
			<tr key={order._id}>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">{order._id}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">
						{order.user && order.user.name}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">
						{order.createdAt.substring(0, 10)}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">{order.totalPrice}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">
						{order.isPaid ? (
							order.paidAt.substring(0, 10)
						) : (
							<HiOutlineXCircle className="w-8 h-8 text-red-600" />
						)}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">
						{order.isDelivered ? (
							order.deliveredAt.substring(0, 10)
						) : (
							<HiOutlineXCircle className="w-8 h-8 text-red-600" />
						)}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-right">
					<Link to={`/order/${order._id}/edit`}>
						<button
							className="bg-gray-200 rounded-full p-3 focus:outline-none focus:ring focus:border-blue-300"
							type="button"
						>
							Details
						</button>
					</Link>
				</td>
			</tr>
		));

	return (
		<div className="mt-12">
			<h1 className="mb-5 text-defaultSize uppercase text-gray-800">
				Orders
			</h1>

			{loading ? (
				<Spinner />
			) : error ? (
				<Alert
					icon={<HiOutlineInformationCircle />}
					content={error}
					type="danger"
				/>
			) : orders?.length === 0 ? (
				<Alert
					icon={<HiOutlineInformationCircle />}
					content="No orders"
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
													User
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Date
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Total
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Paid
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Delivered
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
											{ordersRecords()}
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

export default OrderListScreen;
