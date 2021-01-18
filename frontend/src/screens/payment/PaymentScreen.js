import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';

const PaymentScreen = () => {

    const history = useHistory();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));

        history.push('/placeorder');
    }

    return (
        <div className="mt-16 text-defaultSize">
            <div className="flex flex-wrap justify-center items-center -mx-4">
                <CheckoutSteps step1 step2 step3 />
                <div className="w-full md:w-3/6 px-4">
                    <h1 className="uppercase font-extrabold">Payment Method</h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <fieldset>
                            <div>
                                <legend className="font-medium text-gray-900">
                                    Payment Method
                                </legend>
                                <p className="text-sm text-gray-500">Choose the payment method.</p>
                            </div>
                            <div className="mt-10 space-y-4">
                                <div className="flex items-center">
                                    <input 
                                        value={paymentMethod}
                                        id="paypal" 
                                        name="paymentMethod" 
                                        type="radio" 
                                        checked
                                        onChange={e => setPaymentMethod(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="paypal" 
                                        className="ml-3 block font-medium text-gray-700">
                                        PayPal or Credit Card
                                    </label>
                                </div>
                                {/* <div className="flex items-center">
                                    <input 
                                        id="stripe" 
                                        name="paymentMethod" 
                                        type="radio" 
                                        onChange={e => setPaymentMethod(e.target.value)}
                                    />
                                    <label 
                                        htmlFor="stripe" 
                                        className="ml-3 block font-medium text-gray-700">
                                        Stripe
                                    </label>
                                </div> */}
                            </div>
                        </fieldset>
                        <button 
                            type='submit' 
                            className="w-full mt-5 uppercase text-fontMed focus:outline-none focus:ring focus:border-blue-300"
                        >Continue</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PaymentScreen;
