// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 

// Create Product
router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Read All Products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read a Product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a Product
router.put('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a Product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;


// Find a product by name
router.get('/products/name/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const products = await Product.find({ name: { $regex: new RegExp(name, 'i') } });
        if (products.length === 0) {
            return res.status(404).send({ message: "No products found with this name" });
        }
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

