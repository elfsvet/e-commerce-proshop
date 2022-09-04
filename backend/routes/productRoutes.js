import express from 'express';
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  createProductReview,
  getProductById,
  getProducts,
  updateProduct,
  getTopProducts,
} from '../controllers/productController.js';
// we cleaned up it to controllers productController.js
import { protect, admin } from '../middleware/authMiddleware.js';
//we can do this router.get('/',getProducts) but I would love to try this:
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);

// we also try a different route router.get('/:id', getProductById)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
