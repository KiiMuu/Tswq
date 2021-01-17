import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex flex-wrap justify-center mb-10 space-x-5">
            <div>
                {step1 ? (
                    <Link className="bg-white text-primary p-2 px-4 shadow rounded" to='/signin'>
                        <span>Sign in</span>
                    </Link>
                ) : <Link to='/signin' className="p-2 px-4 shadow rounded text-gray-400 bg-gray-200 pointer-events-none">Sign in</Link>}
            </div>
            <div>
                {step2 ? (
                    <Link className="bg-white text-primary p-2 px-4 shadow rounded" to='/shipping'>
                        <span>Shipping</span>
                    </Link>
                ) : <Link  to='/shipping' className="p-2 px-4 shadow rounded text-gray-400 bg-gray-200 pointer-events-none">Shipping</Link>}
            </div>
            <div>
                {step3 ? (
                    <Link className="bg-white text-primary p-2 px-4 shadow rounded" to='/payment'>
                        <span>Payment</span>
                    </Link>
                ) : <Link  to='/payment' className="p-2 px-4 shadow rounded text-gray-400 bg-gray-200 pointer-events-none">Payment</Link>}
            </div>
            <div>
                {step4 ? (
                    <Link className="bg-white text-primary p-2 px-4 shadow rounded" to='/placeorder'>
                        <span>Place Order</span>
                    </Link>
                ) : <Link  to='/placeorder' className="p-2 px-4 shadow rounded text-gray-400 bg-gray-200 pointer-events-none">Place Order</Link>}
            </div>
        </nav>
    )
}

export default CheckoutSteps;
