import { Router } from 'express';
import {
  createHospitalController,
  getAllHospitalController,
  updateHospitalController,
  getHospitalController,
  deleteHospitalController
} from '@src/controllers/hospitalController';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
import hospitalSchema from '@src/validations/hospitalValidation';
import { authMiddleware } from '@src/middleware/authMiddleware';
import { restrictMiddleware } from '@src/middleware/restrictMiddleware';
const hospitalRoute = Router();

hospitalRoute.post(
  '/hospitals',
  authMiddleware,
  validateSchemaPayload(hospitalSchema),
  createHospitalController
);

hospitalRoute.get(
  '/get-hospitals',
  authMiddleware,
  restrictMiddleware('superadmin'),
  getAllHospitalController
);

hospitalRoute.patch(
  '/hospitals/:id',
  authMiddleware,
  restrictMiddleware('superadmin'),
  updateHospitalController
);
hospitalRoute.get(
  '/hospitals/:id',
  authMiddleware,
  restrictMiddleware('superadmin'),
  getHospitalController
);
hospitalRoute.delete(
  '/hospitals/:id',
  authMiddleware,
  restrictMiddleware('superadmin'),
  deleteHospitalController
);



export default hospitalRoute;
