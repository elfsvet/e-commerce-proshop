import Product from '../models/productModel.js'
// to not write the error logic with try/catch use this
import asyncHandler from 'express-async-handler'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
// if we want to create a harcoded error we can do it here with line below
// throw new Error('Some error')
    res.json(products);
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete single product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message: 'Product removed successfully'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProductById,
    getProducts,
    deleteProduct,
}