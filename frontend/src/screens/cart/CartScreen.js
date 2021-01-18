import { Fragment, useEffect } from 'react';
import { 
    useParams, 
    useLocation,
    useHistory
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Cart.module.scss';
import Alert from '../../components/layout/alert/Alert';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { 
    HiOutlineTrash,
    HiOutlineInformationCircle,
    HiOutlineCheck
} from 'react-icons/hi';

const CartScreen = () => {

    const { id } = useParams();
    const location = useLocation();
    const history = useHistory();

    // ?qty=1 as output of qty 
    // this gets the value of qty in a Number format
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]);

    const getQuantityTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.qty, 0);
    }

    const getPriceTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
    }

    const handleDelete = id => {
        dispatch(removeFromCart(id));
    }

    const handleCheckout = () => {
        history.push('/signin?redirect=shipping');
    }

    const items = () => (
        cartItems.map(item => (
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
                    <div className="text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex leading-5 rounded-full bg-blue-200 text-primary-dark p-4">
                        ${item.price}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    <label className="mr-5">Quantity:</label>
                    <select 
                        className="focus:outline-none focus:ring focus:border-blue-300 cursor-pointer bg-gray-50"
                        value={item.qty}
                        onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {[...Array(item.countInStock).keys()].map(x => (
                            <option
                                key={x + 1}
                                value={x + 1}
                            >{x + 1}</option>
                        ))}
                    </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                        className="bg-gray-200 rounded-full p-3 focus:outline-none focus:ring focus:border-blue-300" 
                        type="button" 
                        onClick={() => handleDelete(item.product)}>
                        <HiOutlineTrash className="w-8 h-8 text-red-600" />
                    </button>
                </td>
            </tr>
        ))
    );

    return (
        <div className="mt-12">
            <h1 className="mb-5 text-defaultSize uppercase text-gray-800">Your cart products</h1>

            {cartItems?.length === 0 ? (
                <Alert
                    icon={<HiOutlineInformationCircle />}
                    content="Your cart is empty."
                    type="normal"
                />
            ) : (
                <Fragment>
                    <div className="flex flex-col text-fontMed">
                        <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
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
                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                                    Quantity
                                                </th>
                                                <th scope="col" class="relative px-6 py-3">
                                                    <span class="sr-only">Delete</span>
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
                    <div className="flex text-fontMed mt-10">
                        <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                                    Total
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                                    Checkout
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-gray-900">{getQuantityTotal()} items</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-gray-900">${getPriceTotal()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button 
                                                    type="button" 
                                                    className={styles['checkout-btn']}
                                                    disabled={cartItems.length === 0}
                                                    onClick={handleCheckout}>
                                                    <span>
                                                        Checkout
                                                        <HiOutlineCheck className={styles['icon']} />
                                                    </span>
                                                </button>
                                            </td>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default CartScreen;
