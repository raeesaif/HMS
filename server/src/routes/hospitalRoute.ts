import { Router } from 'express';
import { createHospitalController,getAllHospitalController } from '@src/controllers/hospitalController';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
import hospitalSchema from '@src/validations/hospitalValidation';
import { authMiddleware } from '@src/middleware/authMiddleware';
const hospitalRoute = Router();

hospitalRoute.post(
  '/hospitals',
  authMiddleware,
  validateSchemaPayload(hospitalSchema),
  createHospitalController
);

hospitalRoute.get("/get-hospitals",getAllHospitalController)

export default hospitalRoute;
