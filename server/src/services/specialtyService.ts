import { Types } from 'mongoose';
import SpecialtyModel from '@src/models/SpecialtyModel';
import AppError from '@src/utils/appError';

type SpecialtyInput = {
  name: string;
  description?: string;
  isActive?: boolean;
};

const assertValidId = (id: string): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'Invalid specialty id');
  }
};

const createSpecialty = async (data: SpecialtyInput) => {
  const existing = await SpecialtyModel.findOne({ name: data.name });

  if (existing) {
    throw new AppError(409, 'Specialty with this name already exists');
  }

  return SpecialtyModel.create(data);
};

const getAllSpecialties = async () => {
  return SpecialtyModel.find().sort({ name: 1 });
};

const getSpecialtyById = async (id: string) => {
  assertValidId(id);

  const specialty = await SpecialtyModel.findById(id);

  if (!specialty) {
    throw new AppError(404, 'Specialty not found');
  }

  return specialty;
};

const updateSpecialty = async (id: string, data: Partial<SpecialtyInput>) => {
  assertValidId(id);

  const specialty = await SpecialtyModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!specialty) {
    throw new AppError(404, 'Specialty not found');
  }

  return specialty;
};

const deleteSpecialty = async (id: string) => {
  assertValidId(id);

  const specialty = await SpecialtyModel.findByIdAndDelete(id);

  if (!specialty) {
    throw new AppError(404, 'Specialty not found');
  }
};

export {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
};
