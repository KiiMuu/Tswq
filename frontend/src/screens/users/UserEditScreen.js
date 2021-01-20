import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/layout/spinner/Spinner';
import { getUserDetails, updateUser } from '../../actions/userActions';
import Alert from '../../components/layout/alert/Alert';
import { HiOutlineExclamationCircle, HiOutlineReply } from 'react-icons/hi';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

const UserEditScreen = () => {
	const { id } = useParams();
	const history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { error, loading, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		error: errorUpdate,
		loading: loadingUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });

			history.push('/admin/users');
		} else {
			if (!user.name || user._id !== id) {
				dispatch(getUserDetails(id));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [user, dispatch, id, successUpdate, history]);

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(updateUser({ _id: id, name, email, isAdmin }));
	};

	return (
		<Fragment>
			<div className="mt-12 mb-5 text-defaultSize">
				<Link
					to="/admin/users"
					className="bg-gray-100 shadow-sm text-primary inline-block rounded-full p-3"
					title="Back to users"
				>
					<HiOutlineReply />
				</Link>
			</div>
			<div className="text-defaultSize">
				<div className="flex justify-center -mx-4">
					<div className="w-full md:w-3/6 px-4">
						<h1 className="uppercase font-extrabold">Edit user</h1>
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
										type="email"
										inputMode="email"
										placeholder="Type your email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<div>
									<div className="flex items-center justify-start">
										<div className="flex items-center">
											<input
												id="isAdmin"
												type="checkbox"
												className="h-5 w-5"
												checked={isAdmin}
												onChange={(e) =>
													setIsAdmin(e.target.checked)
												}
											/>
										</div>
										<div className="ml-3">
											<label
												for="isAdmin"
												className="text-gray-700"
											>
												is Admin
											</label>
										</div>
									</div>
								</div>
								<button
									type="submit"
									className="w-full mt-5 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
									onClick={handleSubmit}
								>
									{loading ? <Spinner /> : 'Save'}
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default UserEditScreen;
