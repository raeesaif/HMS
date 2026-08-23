import { Router } from 'express';
import {
  createSpecialty,
  getAllSpecialties,
  getSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from '@src/controllers/specialtyController';
import {
  createSpecialtySchema,
  updateSpecialtySchema,
} from '@src/validations/specialtyValidation';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
import { authMiddleware } from '@src/middleware/authMiddleware';
import { restrictMiddleware } from '@src/middleware/restrictMiddleware';

const specialtyRouter = Router();

specialtyRouter.get('/', getAllSpecialties);
specialtyRouter.get('/:id', getSpecialty);

specialtyRouter.use(authMiddleware, restrictMiddleware('admin', 'superadmin'));

specialtyRouter.post(
  '/',
  validateSchemaPayload(createSpecialtySchema),
  createSpecialty
);
specialtyRouter.patch(
  '/:id',
  validateSchemaPayload(updateSpecialtySchema),
  updateSpecialty
);
specialtyRouter.delete('/:id', deleteSpecialty);

export default specialtyRouter;
