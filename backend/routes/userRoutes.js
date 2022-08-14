import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
import { authUser, getUserProfile } from '../controllers/userController.js'
// we cleaned up it to controllers productController.js

router.post('/login', authUser)
router.route('/profile').get(protect ,getUserProfile)


export default router