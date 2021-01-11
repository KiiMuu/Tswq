import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';
import connectDB from './config/db.js';

// routes
import productRoutes from './routes/productRoutes.js';

// middlewares
import {
    errorHandler,
    routeHandler
} from './middleware/errorMiddleware.js';

// db connection
connectDB();

const app = express();

// use routes
app.use('/api/products', productRoutes);

// use middlewares
app.use(routeHandler);
app.use(errorHandler);

// app listening
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is up on port ${port} in ${process.env.NODE_ENV} mode.`.cyan.underline.bold);
});