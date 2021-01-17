import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex flex-wrap w-full justify-center mb-10 space-x-5">
            <div>
                {step1 ? (
                    <Link className="sm:bg-white text-primary underline sm:no-underline sm:py-2 sm:px-4 sm:shadow sm:rounded" to='/signin'>
                        <span>Signin</span>
                    </Link>
                ) : <Link to='/signin' className="sm:py-2 sm:px-4 sm:shadow sm:rounded text-gray-400 sm:bg-gray-200 pointer-events-none">Sign in</Link>}
            </div>
            <div>
                {step2 ? (
                    <Link className="sm:bg-white text-primary underline sm:no-underline sm:py-2 sm:px-4 sm:shadow sm:rounded" to='/shipping'>
                        <span>Shipping</span>
                    </Link>
                ) : <Link  to='/shipping' className="sm:py-2 sm:px-4 sm:shadow sm:rounded text-gray-400 sm:bg-gray-200 pointer-events-none">Shipping</Link>}
            </div>
            <div>
                {step3 ? (
                    <Link className="sm:bg-white text-primary underline sm:no-underline sm:py-2 sm:px-4 sm:shadow sm:rounded" to='/payment'>
                        <span>Payment</span>
                    </Link>
                ) : <Link  to='/payment' className="sm:py-2 sm:px-4 sm:shadow sm:rounded text-gray-400 sm:bg-gray-200 pointer-events-none">Payment</Link>}
            </div>
            <div>
                {step4 ? (
                    <Link className="sm:bg-white text-primary underline sm:no-underline sm:py-2 sm:px-4 sm:shadow sm:rounded" to='/placeorder'>
                        <span>Place Order</span>
                    </Link>
                ) : <Link  to='/placeorder' className="sm:py-2 sm:px-4 sm:shadow sm:rounded text-gray-400 sm:bg-gray-200 pointer-events-none">Place Order</Link>}
            </div>
        </nav>
    )
}

export default CheckoutSteps;
