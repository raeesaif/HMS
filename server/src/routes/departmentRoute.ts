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
import { authMiddleware, restrictTo } from '@src/middleware/authMiddleware';

const departmentRouter = Router();

departmentRouter.get('/', getAllDepartments);
departmentRouter.get('/:id', getDepartment);

departmentRouter.use(authMiddleware, restrictTo('admin', 'superadmin'));

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
