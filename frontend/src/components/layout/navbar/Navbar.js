import { useState } from 'react';
import styles from './Navbar.module.scss';
import { 
    HiOutlineShoppingCart,
    HiOutlineX,
    HiMenuAlt3,
    HiOutlineLogout
} from 'react-icons/hi';
// import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => setIsNavOpen(!isNavOpen);

    return (
        <div className="text-defaultSize bg-gray-800 shadow-md">
            <div className="container">
                <nav className="flex items-center py-8 justify-between">
                    <div className="flex items-baseline uppercase">
                        <span className="bg-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md">
                            <a href="/" className="tracking-widest">Tswq</a>
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-4 text-fontMed uppercase">
                            <a className="inline-flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md" href="/cart"> 
                                <HiOutlineShoppingCart 
                                    className="-ml-1 mr-2 h-7 w-7 text-gray-300" 
                                />
                                Cart
                            </a>
                            <a className="inline-flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md" href="/signin">
                                <HiOutlineLogout
                                    className="-ml-1 mr-2 h-7 w-7 text-gray-300"
                                />
                                Sign in
                            </a>
                        </div>
                    </div>
                    {/* mobile menu icon */}
                    <div className="flex items-center md:hidden">
                        <button 
                            onClick={toggleNav}
                            type="button" 
                            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" aria-haspopup="true">
                            <HiMenuAlt3 
                                className="h-9 w-9 text-gray-300"
                            />
                        </button>
                    </div>
                    {/* mobile menu content */}
                    <div className={`absolute top-0 inset-x-0 py-4 px-2 md:hidden ${isNavOpen ? styles['show_nav'] : styles['hide_nav']}`}>
                        <div className="rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="px-5 pt-4 flex items-center justify-between">
                                <div className="flex items-baseline uppercase">
                                    <span className="text-gray-800 py-2 px-4 rounded-md">
                                        <a href="/" className="tracking-widest">Tswq</a>
                                    </span>
                                </div>
                                <div className="flex items-baseline">
                                    <button
                                        onClick={toggleNav} 
                                        type="button" 
                                        className="text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                        <HiOutlineX
                                            className="h-9 w-9 text-gray-300" 
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 pt-4 pb-4 space-y-4 text-fontMed">
                                <a className="block px-4 py-4 rounded-md text-gray-800 hover:bg-gray-100" href="/cart">
                                    <HiOutlineShoppingCart 
                                        className="-mt-1 -ml-1 mr-2 h-7 w-7 text-gray-800 inline-block" 
                                    />
                                    Cart
                                </a>
                                <a className="block px-4 py-4 rounded-md text-gray-800 hover:bg-gray-100" href="/cart">
                                    <HiOutlineLogout 
                                        className="-mt-1 -ml-1 mr-2 h-7 w-7 text-gray-800 inline-block" 
                                    />
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
