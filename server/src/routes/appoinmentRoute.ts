import { Router } from 'express';
import {
  createAppoinmentController,
  getAppoinmentController,
  getAvailableSlotsController,
} from '@src/controllers/appointmentController';
import { authMiddleware } from '@src/middleware/authMiddleware';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
import { createAppoinmentSchema } from '@src/validations/appoinmentValidation';

const appoinmentRouter = Router();

appoinmentRouter.post(
  '/appoinment',
  authMiddleware,
  validateSchemaPayload(createAppoinmentSchema),
  createAppoinmentController
);

appoinmentRouter.get(
  '/get-appoinment',
  authMiddleware,
  getAppoinmentController
);

appoinmentRouter.get(
  '/appoinment/available-slots',
  authMiddleware,
  getAvailableSlotsController
);

export default appoinmentRouter;
