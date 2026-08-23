import { Router } from 'express';
import { register,login,meController } from '@src/controllers/authController';
import userSchema from '@src/validations/userValidation';
import { loginSchema } from '@src/validations/userValidation';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
import { authMiddleware } from '@src/middleware/authMiddleware';
const authRouter = Router();

authRouter.post('/register', validateSchemaPayload(userSchema), register);
authRouter.post('/login', validateSchemaPayload(loginSchema), login);
authRouter.get("/me",authMiddleware,meController)

export default authRouter;
