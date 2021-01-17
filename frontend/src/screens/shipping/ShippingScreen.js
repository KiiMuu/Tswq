import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';

const ShippingScreen = () => {

    const history = useHistory();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    // localStorage values
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(saveShippingAddress({ address, city, postalCode, country }));

        history.push('/payment');
    }

    return (
        <div className="mt-16 text-defaultSize">
            <div className="flex flex-wrap justify-center items-center -mx-4">
                <div className="w-full md:w-3/6 px-4">
                    <h1 className="uppercase font-extrabold">Shipping</h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-5">
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='text' 
                                inputMode='text'
                                placeholder='Type address'
                                value={address} 
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='text' 
                                inputMode='text'
                                placeholder='Type city'
                                value={city} 
                                onChange={e => setCity(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='text' 
                                inputMode='number'
                                placeholder='Type postal code'
                                value={postalCode} 
                                onChange={e => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                className="w-full h-20 pl-5 focus:outline-none focus:ring focus:border-blue-500 shadow rounded"
                                type='text' 
                                inputMode='text'
                                placeholder='Type country'
                                value={country} 
                                onChange={e => setCountry(e.target.value)}
                            />
                        </div>
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

export default ShippingScreen;
