import { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Auth.module.scss';
import Spinner from '../../components/layout/spinner/Spinner';
import { signup } from '../../actions/userActions';
import FormContainer from '../../components/form/FormContainer';
import Error from '../../components/layout/error/Error';
import { 
    HiOutlineUserAdd,
    HiOutlineMail,
    HiOutlineKey,
    HiOutlineExclamationCircle,
    HiOutlineCheckCircle
} from 'react-icons/hi';

const SignupScreen = () => {

    const location = useLocation();
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    let redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const handleSubmit = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(signup(name, email, password));
        }
    }

    return (
        <FormContainer>
            <h1 className="uppercase font-extrabold">Sign Up</h1>
            {message && <Error errorMsg={message} icon={<HiOutlineExclamationCircle />} />}
            {error && <Error errorMsg={error} icon={<HiOutlineExclamationCircle />} />}
            <form onSubmit={handleSubmit} noValidate>
                <div className="relative mb-10">
                    <span className="absolute left-0 top-5">
                        <HiOutlineUserAdd className="w-9 h-9 text-primary" />
                    </span>
                    <input
                        className={styles.controlField}
                        type='text' 
                        inputMode='text'
                        placeholder='Type your name'
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />
                    <span className={styles.border}></span>
                </div>
                <div className="relative mb-10">
                    <span className="absolute left-0 top-5">
                        <HiOutlineMail className="w-9 h-9 text-primary" />
                    </span>
                    <input
                        className={styles.controlField}
                        type='email' 
                        inputMode='email'
                        placeholder='Type your email'
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <span className={styles.border}></span>
                </div>
                <div className="relative mb-10">
                    <span className="absolute left-0 top-5">
                        <HiOutlineKey className="w-9 h-9 text-primary" />
                    </span>
                    <input
                        className={styles.controlField}
                        type='password' 
                        inputMode='text'
                        placeholder='Type your password'
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span className={styles.border}></span>
                </div>
                <div className="relative">
                    <span className="absolute left-0 top-5">
                        <HiOutlineCheckCircle className="w-9 h-9 text-primary" />
                    </span>
                    <input
                        className={styles.controlField}
                        type='password' 
                        inputMode='text'
                        placeholder='confirm your password'
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <span className={styles.border}></span>
                </div>
                <button 
                    type='submit' 
                    className="w-full mt-10 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
                >{loading ? <Spinner /> : 'Sign up'}</button>
                <div className="mt-16 text-fontMed text-gray-900">
                    have an account? 
                    <Link 
                        to={redirect ? `/signin?redirect/${redirect}` : '/signin'}
                        className="text-blue-400 ml-3">
                        Sign in
                    </Link>
                </div>
            </form>
        </FormContainer>
    )
}

export default SignupScreen;