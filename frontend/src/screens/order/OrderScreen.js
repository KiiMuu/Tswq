import { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getOrderDetails,
	payOrder,
	markAsDelivered,
} from '../../actions/orderActions';
import Alert from '../../components/layout/alert/Alert';
import Spinner from '../../components/layout/spinner/Spinner';
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../../constants/orderConstants';
import {
	HiOutlineCheckCircle,
	HiOutlineExclamation,
	HiOutlineInformationCircle,
} from 'react-icons/hi';

const OrderScreen = () => {
	const { id } = useParams();
	const history = useHistory();

	const [sdk, setSdk] = useState(false);

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, error, loading } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, loading: loadingPay } = orderPay; // rename

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce(
				(acc, item) => acc + item.price * item.qty,
				0
			)
		);
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/signin');
		}

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');

			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdk(true);
			};

			document.body.appendChild(script);
		};

		if (!order || successPay || successDeliver) {
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(id));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdk(true);
			}
		}
	}, [dispatch, id, successPay, order, successDeliver]);

	const handleSuccessPayment = (paymentResult) => {
		console.log('result', paymentResult);
		dispatch(payOrder(id, paymentResult));
	};

	const handleDeliver = () => {
		dispatch(markAsDelivered(order));
	};

	const items = () =>
		order.orderItems.map((item) => (
			<tr key={item.product}>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="flex items-center">
						<div className="flex-shrink-0 h-20 w-20">
							<img
								className="h-20 w-20 rounded-md"
								src={item.image}
								alt={item.name}
							/>
						</div>
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">
						<Link to={`/product/${item.product}`}>{item.name}</Link>
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<span className="inline-flex leading-5 rounded-full bg-blue-200 text-primary-dark p-4">
						{item.price} x {item.qty} = ${item.price * item.qty}
					</span>
				</td>
			</tr>
		));

	return loading ? (
		<div className="mt-12 flex justify-center items-center">
			<Spinner />
		</div>
	) : error ? (
		<div className="mt-12">
			<Alert
				icon={<HiOutlineExclamation />}
				content={error}
				type="danger"
			/>
		</div>
	) : (
		<div className="mt-16 text-defaultSize">
			<div className="mb-8">
				<h1 className="uppercase font-extrabold mb-0">Order</h1>
				<span className="text-xl">#{order._id}</span>
			</div>
			<div className="flex flex-wrap -mx-4">
				<div className="w-full md:w-4/6 px-4 mb-10 md:mb-0">
					<div className="bg-white p-5 md:p-10 rounded shadow">
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Name
							</span>
							<span className="text-2xl text-gray-500">
								{order.user.name}
							</span>
						</div>
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Email
							</span>
							<a
								href={`mailto:${order.user.email}`}
								className="text-2xl text-gray-500"
							>
								{order.user.email}
							</a>
						</div>
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Address
							</span>
							<span className="text-2xl text-gray-500">
								{order.shippingAddress.address},{' '}
								{order.shippingAddress.city},{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</span>
							<span className="text-2xl text-gray-500">
								{order.isDelivered ? (
									<div className="mt-5">
										<Alert
											icon={<HiOutlineCheckCircle />}
											content={`Delivered on ${order.deliveredAt}`}
											type="success"
										/>
									</div>
								) : (
									<div className="mt-5">
										<Alert
											icon={
												<HiOutlineInformationCircle />
											}
											content="Not delivered"
											type="normal"
										/>
									</div>
								)}
							</span>
						</div>
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Payment Method
							</span>
							<span className="text-2xl text-gray-500">
								{order.paymentMethod}
							</span>
							<span className="text-2xl text-gray-500">
								{order.isPaid ? (
									<div className="mt-5">
										<Alert
											icon={<HiOutlineCheckCircle />}
											content={`Paid on ${order.paidAt}`}
											type="success"
										/>
									</div>
								) : (
									<div className="mt-5">
										<Alert
											icon={
												<HiOutlineInformationCircle />
											}
											content="Not paid"
											type="normal"
										/>
									</div>
								)}
							</span>
						</div>
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Order Items
							</span>
							<span className="text-2xl">
								{order.orderItems.length === 0 ? (
									<Alert
										icon={<HiOutlineInformationCircle />}
										content="Order is empty"
										type="normal"
									/>
								) : (
									<div className="flex flex-col text-fontMed">
										<div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
											<div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
												<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
													<table className="divide-y divide-gray-200">
														<thead className="bg-gray-50">
															<tr>
																<th
																	scope="col"
																	class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
																>
																	Image
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
															</tr>
														</thead>
														<tbody className="bg-white divide-y divide-gray-200">
															{items()}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="w-full md:w-2/6 px-4">
					<div className="bg-white p-5 md:p-10 rounded shadow">
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Items
							</span>
							<span className="text-2xl">
								${order.itemsPrice}
							</span>
						</div>
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Shipping
							</span>
							<span className="text-2xl">
								${order.shippingPrice}
							</span>
						</div>
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Tax
							</span>
							<span className="text-2xl">${order.taxPrice}</span>
						</div>
						<div className="text-2xl text-gray-700 mb-8">
							<span className="block uppercase text-primary mb-2">
								Total
							</span>
							<span className="text-2xl">
								${order.totalPrice}
							</span>
						</div>
					</div>
					{!order.isPaid && (
						<div>
							{loadingPay && <Spinner />}
							{!sdk ? (
								<Spinner />
							) : (
								<PayPalButton
									amount={order.totalPrice}
									onSuccess={handleSuccessPayment}
								/>
							)}
						</div>
					)}

					{loadingDeliver && <Spinner />}
					{userInfo &&
						userInfo.isAdmin &&
						order.isPaid &&
						!order.isDelivered && (
							<div>
								<button
									type="button"
									className="block bg-primary text-white py-6 px-4"
									onClick={handleDeliver}
								>
									Mark As Delivered
								</button>
							</div>
						)}
				</div>
			</div>
		</div>
	);
};

export default OrderScreen;
