import { Router } from 'express';
import {
  createAppoinmentController,
  getAppoinmentController,
  getAvailableSlotsController,
  cancelAppoinmentController,
  deleteAppoinmentController,
} from '@src/controllers/appointmentController';
import { authMiddleware } from '@src/middleware/authMiddleware';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
import {
  createAppoinmentSchema,
  cancelAppoinmentSchema,
} from '@src/validations/appoinmentValidation';

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

appoinmentRouter.patch(
  '/appoinment/:id/cancel',
  authMiddleware,
  validateSchemaPayload(cancelAppoinmentSchema),
  cancelAppoinmentController
);

appoinmentRouter.delete(
  '/appoinment/:id',
  authMiddleware,
  deleteAppoinmentController
);

export default appoinmentRouter;
