import { useEffect } from 'react';
import { 
    Link, 
    useParams, 
    useLocation,
    useHistory
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/layout/alert/Alert';
import { addToCart } from '../../actions/cartActions';

const CartScreen = () => {

    const { id } = useParams();
    const location = useLocation();
    const history = useHistory();

    // ?quantity=1 as output of quantity 
    // this gets the value of quantity in a Number format
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, quantity));
        }
    }, [dispatch, id, quantity]);

    return (
        <div className="mt-12">
            Cart    
        </div>
    )
}

export default CartScreen;
