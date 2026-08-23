import { Router } from 'express';
import { register,login } from '@src/controllers/authController';
import userSchema from '@src/validations/userValidation';
import { loginSchema } from '@src/validations/userValidation';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
const authRouter = Router();

authRouter.post('/register', validateSchemaPayload(userSchema), register);
authRouter.post('/login', validateSchemaPayload(loginSchema), login);

export default authRouter;
