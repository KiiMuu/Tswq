import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import products from './data/products.js';

const app = express();

// routes
app.get('/', (req, res) => {
    res.send('API is on fire!')
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const pro = products.find(p => p._id === req.params.id);

    res.json(pro)
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is up on port ${port} in ${process.env.NODE_ENV} mode.`);
});