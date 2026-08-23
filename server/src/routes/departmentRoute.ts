import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from '@src/controllers/departmentController';
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from '@src/validations/departmentValidation';
import validateSchemaPayload from '@src/utils/validateSchemaPayload';
import { authMiddleware } from '@src/middleware/authMiddleware';
import { restrictMiddleware } from '@src/middleware/restrictMiddleware';

const departmentRouter = Router();

departmentRouter.get('/', getAllDepartments);
departmentRouter.get('/:id', getDepartment);

departmentRouter.use(authMiddleware, restrictMiddleware('admin', 'superadmin'));

departmentRouter.post(
  '/',
  validateSchemaPayload(createDepartmentSchema),
  createDepartment
);
departmentRouter.patch(
  '/:id',
  validateSchemaPayload(updateDepartmentSchema),
  updateDepartment
);
departmentRouter.delete('/:id', deleteDepartment);

export default departmentRouter;
