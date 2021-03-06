import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Auth.module.scss';
import Spinner from '../../components/layout/spinner/Spinner';
import { signin } from '../../actions/userActions';
import FormContainer from '../../components/form/FormContainer';
import Error from '../../components/layout/error/Error';
import {
	HiOutlineMail,
	HiOutlineKey,
	HiOutlineExclamationCircle,
} from 'react-icons/hi';

const SigninScreen = () => {
	const location = useLocation();
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	let redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(signin(email, password));
	};

	return (
		<FormContainer>
			<h1 className="uppercase font-extrabold">Sign In</h1>
			{error && (
				<Error errorMsg={error} icon={<HiOutlineExclamationCircle />} />
			)}
			<form onSubmit={handleSubmit} noValidate>
				<div className="relative mb-10">
					<span className="absolute left-0 top-5">
						<HiOutlineMail className="w-9 h-9 text-primary" />
					</span>
					<input
						className={styles.controlField}
						type="email"
						inputMode="email"
						placeholder="Type your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<span className={styles.border}></span>
				</div>
				<div className="relative">
					<span className="absolute left-0 top-5">
						<HiOutlineKey className="w-9 h-9 text-primary" />
					</span>
					<input
						className={styles.controlField}
						type="password"
						inputMode="text"
						placeholder="Type your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<span className={styles.border}></span>
				</div>
				<button
					type="submit"
					className="w-full mt-10 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
				>
					{loading ? <Spinner /> : 'Sign in'}
				</button>
				<div className="mt-16 text-fontMed text-gray-900">
					Don't have an account?
					<Link
						to={
							redirect
								? `/signup?redirect/${redirect}`
								: '/signup'
						}
						className="text-blue-400 ml-3"
					>
						Sign up
					</Link>
				</div>
			</form>
		</FormContainer>
	);
};

export default SigninScreen;
