import express from 'express';
const router = express.Router();
import { getProductById, getProducts } from '../controllers/productController.js'
// we cleaned up it to controllers productController.js

//we can do this router.get('/',getProducts) but I would love to try this:
router.route('/').get(getProducts)

// we also try a different route router.get('/:id', getProductById)
router.route('/:id').get(getProductById)


export default router