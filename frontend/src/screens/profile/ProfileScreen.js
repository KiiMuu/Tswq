import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/layout/spinner/Spinner';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import Error from '../../components/layout/error/Error';
import Alert from '../../components/layout/alert/Alert';
import { 
    HiOutlineExclamationCircle,
    HiOutlineCheckCircle
} from 'react-icons/hi';

const ProfileScreen = () => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const updateUser = useSelector(state => state.updateUser);
    const { success, loading, error } = updateUser;

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

        dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }

    return (
        <div className="mt-12 text-defaultSize">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-2/6 md:mb-0 mb-5 px-4">
                    <h1 className="uppercase font-extrabold">User Profile</h1>
                    {error && <Error errorMsg={error} icon={<HiOutlineExclamationCircle />} />}
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
                        <div>
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='password' 
                                inputMode='text'
                                placeholder='Type your new password'
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            type='submit' 
                            className="w-full mt-5 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
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