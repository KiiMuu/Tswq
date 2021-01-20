import { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/layout/alert/Alert';
import Spinner from '../../components/layout/spinner/Spinner';
import { getUserList, deleteUser } from '../../actions/userActions';
import {
	HiOutlineTrash,
	HiOutlineInformationCircle,
	HiOutlineCheckCircle,
	HiOutlinePencil,
	HiOutlineXCircle,
} from 'react-icons/hi';

const UserListScreen = () => {
	const history = useHistory();

	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getUserList());
		} else {
			history.push('/signin');
		}
	}, [dispatch, userInfo, history, successDelete]);

	const handleUserDelete = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};

	const usersRecords = () =>
		users.map((user) => (
			<tr key={user._id}>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">{user._id}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">{user.name}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">
						<a href={`mailto:${user.email}`}>{user.email}</a>
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-gray-900">
						{user.isAdmin ? (
							<HiOutlineCheckCircle className="w-8 h-8 text-gray-600" />
						) : (
							<HiOutlineXCircle className="w-8 h-8 text-red-600" />
						)}
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-right">
					<Link to={`/admin/user/${user._id}/edit`}>
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
						onClick={() => handleUserDelete(user._id)}
					>
						<HiOutlineTrash className="w-8 h-8 text-red-600" />
					</button>
				</td>
			</tr>
		));

	return (
		<div className="mt-12">
			<h1 className="mb-5 text-defaultSize uppercase text-gray-800">
				Users
			</h1>

			{loading ? (
				<Spinner />
			) : error ? (
				<Alert
					icon={<HiOutlineInformationCircle />}
					content={error}
					type="danger"
				/>
			) : users?.length === 0 ? (
				<Alert
					icon={<HiOutlineInformationCircle />}
					content="No users"
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
													Email
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
												>
													Admin
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
											{usersRecords()}
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

export default UserListScreen;
