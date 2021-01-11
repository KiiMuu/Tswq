const express = require('express');
const products = require('./data/products');

const app = express();

// routes
app.get('/', (req, res) => {
    res.send('API is on fire!')
});

app.get('/api/products', (req, res) => {
    res.json(products)
});

app.get('/api/products/:id', (req, res) => {
    const pro = products.find(p => p._id === req.params.id);

    res.json(pro)
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App is up on port ${port}`));