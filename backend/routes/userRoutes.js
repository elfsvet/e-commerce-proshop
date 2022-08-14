import express from 'express';
const router = express.Router();
import { authUser } from '../controllers/userController.js'
// we cleaned up it to controllers productController.js

router.post('/login', authUser)
export default router