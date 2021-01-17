import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import Alert from '../../components/layout/alert/Alert';
import styles from './PlaceOrder.module.scss';
import { HiOutlineInformationCircle, HiOutlineShoppingCart } from 'react-icons/hi';

const PlaceOrderScreen = () => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));

    const handlePlaceOrder = () => {}

    const items = () => (
        cart.cartItems.map(item => (
            <tr key={item.product}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                            <img 
                                className="h-20 w-20 rounded-md" 
                                src={item.image} 
                                alt={item.name} 
                            />
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex leading-5 rounded-full bg-blue-200 text-primary-dark p-4">
                        {item.price} x {item.qty} = ${item.price * item.qty}
                    </span>
                </td>
            </tr>
        ))
    );

    return (
        <div className="mt-16 text-defaultSize">
            <div className="flex flex-wrap -mx-4">
                <CheckoutSteps step1 step2 step3 step4 />
                <div className="w-full md:w-4/6 px-4 mb-10 md:mb-0">
                    <h1 className="uppercase font-extrabold">Shipping</h1>
                    <div className="bg-white p-5 md:p-10 rounded shadow">
                        <div className="text-2xl text-gray-700 mb-8">
                            <span className="block uppercase text-primary mb-2">
                                Address
                            </span>
                            <span className="text-2xl text-gray-500">
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </span>
                        </div>
                        <div className="text-2xl text-gray-700 mb-8">
                            <span className="block uppercase text-primary mb-2">
                                Payment Method
                            </span>
                            <span className="text-2xl text-gray-500">
                                {cart.paymentMehod}
                            </span>
                        </div>
                        <div className="text-2xl text-gray-700 mb-8">
                            <span className="block uppercase text-primary mb-2">
                                Order Items
                            </span>
                            <span className="text-2xl">
                                {cart.cartItems.length === 0 ? (
                                    <Alert 
                                        icon={<HiOutlineInformationCircle />}
                                        content="Cart is empty" 
                                        type="normal" 
                                    />
                                ) : (
                                    <div className="flex flex-col text-fontMed">
                                        <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                                            <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
                                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                    <table className="divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                                                    Image
                                                                </th>
                                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                                                    Name
                                                                </th>
                                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                                                    Price
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {items()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/6 px-4">
                    <h1 className="uppercase font-extrabold">Order Summary</h1>
                    <div className="bg-white p-5 md:p-10 rounded shadow">
                        <div className="text-2xl text-gray-700 mb-8">
                            <span className="block uppercase text-primary mb-2">
                                Items
                            </span>
                            <span className="text-2xl">
                                ${cart.itemsPrice}
                            </span>
                        </div>
                        <div className="text-2xl text-gray-700 mb-8">
                            <span className="block uppercase text-primary mb-2">
                                Shipping
                            </span>
                            <span className="text-2xl">
                                ${cart.shippingPrice}
                            </span>
                        </div>
                        <div className="text-2xl text-gray-700 mb-8">
                            <span className="block uppercase text-primary mb-2">
                                Tax
                            </span>
                            <span className="text-2xl">
                                ${cart.taxPrice}
                            </span>
                        </div>
                        <div className="text-2xl text-gray-700 mb-8">
                            <span className="block uppercase text-primary mb-2">
                                Total
                            </span>
                            <span className="text-2xl">
                                ${cart.totalPrice}
                            </span>
                        </div>
                        <button 
                            className={`${cart.cartItems === 0 ? styles.disabled : ''} ${styles.placeOrderBtn} block mt-8 text-fontMed`}
                            type="button"
                            onClick={handlePlaceOrder}
                            disabled={cart.cartItems === 0}>
                            <span>
                                Place Order
                                <HiOutlineShoppingCart className={styles['icon']} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen;
