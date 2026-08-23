import { Router } from 'express';
import { register } from '@src/controllers/authController';
import userSchema from '@src/validations/userValidation';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
const authRouter = Router();

authRouter.post('/register', validateSchemaPayload(userSchema), register);

export default authRouter;
