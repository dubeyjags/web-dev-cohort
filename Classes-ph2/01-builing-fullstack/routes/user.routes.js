import express from 'express'
import { forgotPassword, loginUser, logoutUser, profileUser, registerUser, resetPassword, verifyUser } from '../controller/user.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/register', registerUser)
router.get('/verify/:token', verifyUser)
router.post('/login', loginUser)
router.get('/profile', isLoggedIn, profileUser)
router.get('/logout',isLoggedIn, logoutUser)
router.post('/forgot', forgotPassword)
router.post('/reset/:token', resetPassword)

export default router;