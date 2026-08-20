import { Router } from 'express';

import { register } from '@src/controllers/authController';

const authRouter  = Router();

authRouter.post('/register', register);

export default authRouter;
