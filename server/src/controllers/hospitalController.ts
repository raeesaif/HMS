import { Request, Response, NextFunction } from 'express';
import {
  createHospital,
  getAllHospital,
  updateHospital,
  getHospitalById,
  deleteHospital,
} from '@src/services/hospitalService';
import apiResponse from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

export const createHospitalController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await createHospital({
      ...req.body,
      createdBy: (req as any).user._id,
    });
    apiResponse.success(res, result, 'Hospital created successfully', 201);
  }
);

export const getAllHospitalController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getAllHospital(page, limit);

    apiResponse.success(res, result, 'Hospitals fetched successfully', 200);
  }
);

export const updateHospitalController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const hospital = await updateHospital(String(req.params.id), req.body);
    apiResponse.success(res, hospital, 'Hospital updated successfully');
  }
);

export const getHospitalController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const hospital = await getHospitalById(String(req.params.id));
    apiResponse.success(res, hospital, 'Hospital fetched successfully');
  }
);

export const deleteHospitalController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const hospital = await deleteHospital(String(req.params.id));
    apiResponse.success(res, null, 'Hospital delete successfully');
  }
);
