import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Navbar.module.scss';
import { 
    HiOutlineShoppingCart,
    HiOutlineX,
    HiMenuAlt3,
    HiOutlineLogout,
    HiOutlineUser
} from 'react-icons/hi';
import useToggle from '../../../hooks/useToggle';
import Dropdown from '../../layout/dropdown/Dropdown';
import { logout } from '../../../actions/userActions';

const Navbar = () => {

    const { isOpen, handleToggle, elementRef } = useToggle();

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const handleLogout = () => {
        dispatch(logout());
    }

    // dropdown content
    let options = [
        {id: 1, content: <span className="text-gray-700"><HiOutlineUser className="w-8 h-8 inline-block text-primary" /> Profile</span>},
        {id: 2, content: <span onClick={handleLogout} className="text-gray-700"><HiOutlineLogout className="w-8 h-8 inline-block text-primary" /> Signout</span>}
    ]

    return (
        <div className="text-defaultSize bg-gray-800 shadow-md">
            <div className="container">
                <nav className="flex items-center py-8 justify-between">
                    <div className="flex items-baseline uppercase">
                        <span className="bg-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md">
                            <Link to='/' className="tracking-widest">Tswq</Link>
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-4 text-fontMed uppercase">
                            <Link className="inline-flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md" to='/cart'> 
                                <HiOutlineShoppingCart 
                                    className="-ml-1 mr-2 h-7 w-7 text-gray-300" 
                                />
                                Cart
                            </Link>
                            {userInfo ? (
                                <Dropdown 
                                    name={userInfo.name}
                                    items={options}
                                    style={{ color: '#f3f3f3', textTransform: 'uppercase', outline: 'none', top: '-.4rem', position: 'relative' }}
                                />
                            ) : (
                                <Link className="inline-flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md" to='/signin'>
                                    <HiOutlineLogout
                                        className="-ml-1 mr-2 h-7 w-7 text-gray-300"
                                    />
                                    Sign in
                                </Link>
                            )}
                        </div>
                    </div>
                    {/* mobile menu icon */}
                    <div className="flex items-center md:hidden">
                        <button 
                            onClick={handleToggle}
                            type="button" 
                            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" aria-haspopup="true">
                            <HiMenuAlt3 
                                className="h-9 w-9 text-gray-300"
                            />
                        </button>
                    </div>
                    {/* mobile menu content */}
                    <div ref={elementRef} className={`absolute top-0 inset-x-0 z-50 py-4 px-2 md:hidden ${isOpen ? styles['show_nav'] : styles['hide_nav']}`}>
                        <div className="rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="px-5 pt-4 flex items-center justify-between">
                                <div className="flex items-baseline uppercase">
                                    <span className="text-gray-800 py-2 px-4 rounded-md">
                                        <Link to='/' className="tracking-widest">Tswq</Link>
                                    </span>
                                </div>
                                <div className="flex items-baseline">
                                    <button
                                        onClick={handleToggle} 
                                        type="button" 
                                        className="text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                        <HiOutlineX
                                            className="h-9 w-9 text-gray-300" 
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 pt-4 pb-4 space-y-4 text-fontMed">
                                <Link className="block px-4 py-4 rounded-md text-gray-800 hover:bg-gray-100" to='/cart'>
                                    <HiOutlineShoppingCart 
                                        className="-mt-1 -ml-1 mr-2 h-7 w-7 text-gray-800 inline-block" 
                                    />
                                    Cart
                                </Link>
                                <Link className="block px-4 py-4 rounded-md text-gray-800 hover:bg-gray-100" to='/cart'>
                                    <HiOutlineLogout
                                        className="-mt-1 -ml-1 mr-2 h-7 w-7 text-gray-800 inline-block"
                                    />
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
