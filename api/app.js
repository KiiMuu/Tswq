import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import colors from 'colors';
import connectDB from './config/db.js';

// routes
import productRoutes from './routes/productRoutes.js';

// db connection
connectDB();

const app = express();

// use routes
app.get('/', (req, res) => {
    res.send('API is on fire!')
});
app.use('/api/products', productRoutes);

// app listening
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is up on port ${port} in ${process.env.NODE_ENV} mode.`.cyan.underline.bold);
});