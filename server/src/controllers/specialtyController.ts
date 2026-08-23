import { Request, Response } from 'express';
import catchAsync from '@src/utils/catchAsync';
import apiResponse from '@src/utils/apiResponse';
import {
  createSpecialty as createSpecialtyService,
  getAllSpecialties as getAllSpecialtiesService,
  getSpecialtyById,
  updateSpecialty as updateSpecialtyService,
  deleteSpecialty as deleteSpecialtyService,
} from '@src/services/specialtyService';

const createSpecialty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const specialty = await createSpecialtyService(req.body);
    apiResponse.success(res, specialty, 'Specialty created successfully', 201);
  }
);

const getAllSpecialties = catchAsync(
  async (_req: Request, res: Response): Promise<void> => {
    const specialties = await getAllSpecialtiesService();
    apiResponse.success(res, specialties, 'Specialties fetched successfully');
  }
);

const getSpecialty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const specialty = await getSpecialtyById(String(req.params.id));
    apiResponse.success(res, specialty, 'Specialty fetched successfully');
  }
);

const updateSpecialty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const specialty = await updateSpecialtyService(
      String(req.params.id),
      req.body
    );
    apiResponse.success(res, specialty, 'Specialty updated successfully');
  }
);

const deleteSpecialty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await deleteSpecialtyService(String(req.params.id));
    apiResponse.success(res, null, 'Specialty deleted successfully');
  }
);

export {
  createSpecialty,
  getAllSpecialties,
  getSpecialty,
  updateSpecialty,
  deleteSpecialty,
};
