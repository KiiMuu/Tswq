import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../components/layout/spinner/Spinner';
import Alert from '../../components/layout/alert/Alert';
import { getTopProducts } from '../../actions/productActions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { HiOutlineInformationCircle } from 'react-icons/hi';

const TopProductsScreen = () => {
	const dispatch = useDispatch();

	const productTop = useSelector((state) => state.productTop);
	const { error, loading, products } = productTop;

	useEffect(() => {
		dispatch(getTopProducts());
	}, [dispatch]);

	return loading ? (
		<Spinner />
	) : error ? (
		<Alert
			icon={<HiOutlineInformationCircle />}
			content={error}
			type="danger"
		/>
	) : (
		<Carousel>
			{products.map((product) => (
				<div key={product._id}>
					<Link to={`/product/${product._id}`}>
						<img src={product.image} alt={product.name} />
						<p className="legend">
							{product.name} - (${product.price})
						</p>
					</Link>
				</div>
			))}
		</Carousel>
	);
};

export default TopProductsScreen;
