import { Router } from 'express';
import {
  register,
  login,
  meController,
  updateDutyStatusController,
  updateAvailabilityStatusController,
  getDoctorsController,
  getPatientController,
  getNurseController,
  getReceptionistController,
  updatePasswordController
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

authRouter.post(
  '/register',
  authMiddleware,
  validateSchemaPayload(userSchema),
  register
);
authRouter.post('/login', validateSchemaPayload(loginSchema), login);
authRouter.get('/me', authMiddleware, meController);
authRouter.get(
  '/doctors',
  authMiddleware,
  restrictMiddleware('admin', 'receptionist'),
  getDoctorsController
);
authRouter.get(
  '/patients',
  authMiddleware,
  restrictMiddleware('admin', 'receptionist'),
  getPatientController
);
authRouter.get(
  '/nurses',
  authMiddleware,
  restrictMiddleware('admin', 'receptionist'),
  getNurseController
);
authRouter.get(
  '/receptionists',
  authMiddleware,
  restrictMiddleware('admin', 'receptionist'),
  getReceptionistController
);
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

authRouter.patch(
  '/update-password',
  authMiddleware,
  restrictMiddleware('doctor', 'nurse', 'receptionist', 'admin', 'patient'),
  updatePasswordController
);

export default authRouter;
