import { Router } from 'express';
import {
  register,
  login,
  meController,
  updateDutyStatusController,
  updateAvailabilityStatusController,
} from '@src/controllers/authController';
import userSchema, {
  loginSchema,
  updateDutyStatusSchema,
  updateAvailabilityStatusSchema,
} from '@src/validations/userValidation';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
import { authMiddleware } from '@src/middleware/authMiddleware';
import { restrictMiddleware } from '@src/middleware/restrictMiddleware';
const authRouter = Router();

authRouter.post('/register', validateSchemaPayload(userSchema), register);
authRouter.post('/login', validateSchemaPayload(loginSchema), login);
authRouter.get('/me', authMiddleware, meController);
authRouter.patch(
  '/duty-status',
  authMiddleware,
  restrictMiddleware('doctor', 'nurse', 'receptionist'),
  validateSchemaPayload(updateDutyStatusSchema),
  updateDutyStatusController
);
authRouter.patch(
  '/availability-status',
  authMiddleware,
  restrictMiddleware('doctor', 'nurse', 'receptionist'),
  validateSchemaPayload(updateAvailabilityStatusSchema),
  updateAvailabilityStatusController
);

export default authRouter;
