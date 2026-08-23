import { Request, Response } from 'express';
import catchAsync from '@src/utils/catchAsync';
import apiResponse from '@src/utils/apiResponse';
import {
  createDepartment as createDepartmentService,
  getAllDepartments as getAllDepartmentsService,
  getDepartmentById,
  updateDepartment as updateDepartmentService,
  deleteDepartment as deleteDepartmentService,
} from '@src/services/departmentService';

const createDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const department = await createDepartmentService(req.body);
    apiResponse.success(
      res,
      department,
      'Department created successfully',
      201
    );
  }
);

const getAllDepartments = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const departments = await getAllDepartmentsService();
    apiResponse.success(res, departments, 'Departments fetched successfully');
  }
);

const getDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const department = await getDepartmentById(String(req.params.id));
    apiResponse.success(res, department, 'Department fetched successfully');
  }
);

const updateDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const department = await updateDepartmentService(
      String(req.params.id),
      req.body
    );
    apiResponse.success(res, department, 'Department updated successfully');
  }
);

const deleteDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await deleteDepartmentService(String(req.params.id));
    apiResponse.success(res, null, 'Department deleted successfully');
  }
);

export {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
