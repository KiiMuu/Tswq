import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './config/db.js';

// routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// middlewares
import { errorHandler, routeHandler } from './middleware/errorMiddleware.js';

// db connection
connectDB();

// app initialization
const app = express();

// use middlewares
app.use(express.json());
app.use(morgan('dev'));

// use routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// paypal client id
app.get('/api/config/paypal', (req, res) => {
	return res.send(process.env.PAYPAL_CLIENT_ID);
});

// error handlers
app.use(routeHandler);
app.use(errorHandler);

// app listening
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(
		`App is up on port ${port} in ${process.env.NODE_ENV} mode.`.cyan
			.underline.bold
	);
});
