import express from 'express';
import { registerUser, verifyEmail, loginUser } from '../controllers/authController.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', registerUser);
AuthRouter.get('/verify-email', verifyEmail);
AuthRouter.post('/login', loginUser);

export default AuthRouter;
