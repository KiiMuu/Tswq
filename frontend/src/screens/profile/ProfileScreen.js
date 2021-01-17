import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/layout/spinner/Spinner';
import { getUserDetails } from '../../actions/userActions';
import Error from '../../components/layout/error/Error';
import { 
    HiOutlineExclamationCircle
} from 'react-icons/hi';

const ProfileScreen = () => {

    const location = useLocation();
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push('/signin');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, userInfo, dispatch, user]);

    const handleSubmit = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            // dispatch(signup(name, email, password));
        }
    }

    return (
        <div className="mt-12 text-defaultSize">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-2/6 md:mb-0 mb-5 px-4">
                    <h1 className="uppercase font-extrabold">User Profile</h1>
                    {message && <Error errorMsg={message} icon={<HiOutlineExclamationCircle />} />}
                    {error && <Error errorMsg={error} icon={<HiOutlineExclamationCircle />} />}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-5">
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='text' 
                                inputMode='text'
                                placeholder='Type your name'
                                value={name} 
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='email' 
                                inputMode='email'
                                placeholder='Type your email'
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='password' 
                                inputMode='text'
                                placeholder='Type your password'
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='password' 
                                inputMode='text'
                                placeholder='confirm your password'
                                value={confirmPassword} 
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            type='submit' 
                            className="w-full mt-10 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
                        >{loading ? <Spinner /> : 'Save'}</button>
                    </form>
                </div>
                <div className="w-full md:w-4/6 px-4">
                    my orders
                </div>
            </div>            
        </div>
    )
}

export default ProfileScreen;