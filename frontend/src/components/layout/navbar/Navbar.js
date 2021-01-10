import { useState } from 'react';
import styles from './Navbar.module.scss';
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
                                <svg 
                                    className="-ml-1 mr-2 h-7 w-7 text-gray-300" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor">
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                                    />
                                </svg>
                                Cart
                            </a>
                            <a className="inline-flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md" href="/signin">
                                <svg 
                                    className="-ml-1 mr-2 h-7 w-7 text-gray-300" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor">
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                                    />
                                </svg> 
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
                            <svg 
                                className="h-9 w-9 text-gray-300"  
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M8 6h12M4 12h16m-7 6h7" 
                                />
                            </svg>
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
                                        <svg 
                                            className="h-9 w-9 text-gray-300"  
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor" 
                                            aria-hidden="true">
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2" 
                                                d="M6 18L18 6M6 6l12 12" 
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 pt-4 pb-4 space-y-4 text-fontMed">
                                <a className="block px-4 py-4 rounded-md text-gray-800 hover:bg-gray-100" href="/cart">
                                     <svg 
                                        className="-mt-1 -ml-1 mr-2 h-7 w-7 text-gray-800 inline-block" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor">
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                                        />
                                    </svg>
                                    Cart
                                </a>
                                <a className="block px-4 py-4 rounded-md text-gray-800 hover:bg-gray-100" href="/cart">
                                    <svg 
                                        className="-mt-1 -ml-1 mr-2 h-7 w-7 text-gray-800 inline-block" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor">
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                                        />
                                    </svg> 
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
