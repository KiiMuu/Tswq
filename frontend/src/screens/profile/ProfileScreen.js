import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/layout/spinner/Spinner';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { getUserOrders } from '../../actions/orderActions';
import Error from '../../components/layout/error/Error';
import Alert from '../../components/layout/alert/Alert';
import {
	HiOutlineExclamationCircle,
	HiOutlineCheckCircle,
	HiOutlineXCircle,
} from 'react-icons/hi';

const ProfileScreen = () => {
	const history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const updateUser = useSelector((state) => state.updateUser);
	const { success, loading, error } = updateUser;

	const userOrders = useSelector((state) => state.userOrders);
	const { loading: loadingOrders, error: errorOrders, orders } = userOrders;

	useEffect(() => {
		if (!userInfo) {
			history.push('/signin');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
				dispatch(getUserOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, userInfo, dispatch, user]);

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(updateUserProfile({ id: user._id, name, email, password }));
	};

	const ordersItems = () =>
		orders.map((order) => (
			<tr key={order._id}>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="flex items-center">
						<div className="flex-shrink-0 h-20 w-20">
							{order._id}
						</div>
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">
						{order.createdAt.substring(0, 10)}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<span className="inline-flex leading-5 rounded-full bg-blue-200 text-primary-dark p-4">
						${order.totalPrice}
					</span>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-gray-500">
					<span className="inline-flex leading-5 rounded-full bg-blue-200 text-primary-dark p-4">
						{order.isPaid ? (
							order.paidAt.substring(0, 10)
						) : (
							<HiOutlineXCircle />
						)}
					</span>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-right">
					<span className="inline-flex leading-5 rounded-full bg-blue-200 text-primary-dark p-4">
						{order.isDelivered ? (
							order.deliveredAt.substring(0, 10)
						) : (
							<HiOutlineXCircle />
						)}
					</span>
				</td>
			</tr>
		));

	return (
		<div className="mt-12 text-defaultSize">
			<div className="flex flex-wrap -mx-4">
				<div className="w-full md:w-2/6 md:mb-0 mb-5 px-4">
					<h1 className="uppercase font-extrabold">User Profile</h1>
					{error && (
						<Error
							errorMsg={error}
							icon={<HiOutlineExclamationCircle />}
						/>
					)}
					{success && (
						<div className="mb-5">
							<Alert
								icon={<HiOutlineCheckCircle />}
								content="Profile updated successully"
								type="success"
							/>
						</div>
					)}
					<form onSubmit={handleSubmit} noValidate>
						<div className="mb-5">
							<input
								className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
								type="text"
								inputMode="text"
								placeholder="Type your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="mb-5">
							<input
								className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
								type="email"
								inputMode="email"
								placeholder="Type your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<input
								className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
								type="password"
								inputMode="text"
								placeholder="Type your new password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							type="submit"
							className="w-full mt-5 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
						>
							{loading ? <Spinner /> : 'Save'}
						</button>
					</form>
				</div>
				<div className="w-full md:w-4/6 px-4">
					<h1 className="uppercase">my orders</h1>
					{loadingOrders ? (
						<Spinner />
					) : errorOrders ? (
						<Alert
							icon={<HiOutlineExclamationCircle />}
							content={errorOrders}
							type="danger"
						/>
					) : (
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
														ID
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
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{ordersItems()}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfileScreen;
