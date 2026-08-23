import { Types } from 'mongoose';
import DepartmentModel from '@src/models/DepartmentModel';
import AppError from '@src/utils/appError';

type DepartmentInput = {
  name: string;
  description?: string;
  isActive?: boolean;
};

const assertValidId = (id: string): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'Invalid department id');
  }
};

const createDepartment = async (data: DepartmentInput) => {
  const existing = await DepartmentModel.findOne({ name: data.name });

  if (existing) {
    throw new AppError(409, 'Department with this name already exists');
  }

  return DepartmentModel.create(data);
};

const getAllDepartments = async () => {
  return DepartmentModel.find().sort({ name: 1 });
};

const getDepartmentById = async (id: string) => {
  assertValidId(id);

  const department = await DepartmentModel.findById(id);

  if (!department) {
    throw new AppError(404, 'Department not found');
  }

  return department;
};

const updateDepartment = async (
  id: string,
  data: Partial<DepartmentInput>
) => {
  assertValidId(id);

  const department = await DepartmentModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!department) {
    throw new AppError(404, 'Department not found');
  }

  return department;
};

const deleteDepartment = async (id: string) => {
  assertValidId(id);

  const department = await DepartmentModel.findByIdAndDelete(id);

  if (!department) {
    throw new AppError(404, 'Department not found');
  }
};

export {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
