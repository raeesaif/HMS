import {
  CreateAppoinmentService,
  getAllappoinmentService,
} from '@src/services/appointmentService';
import apiResponse from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import { Request, Response } from 'express';

const createAppoinmentController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const appoinment = await CreateAppoinmentService(req.body);
    apiResponse.success(
      res,
      appoinment,
      'Appoinment created successfully',
      201
    );
  }
);

const getAppoinmentController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const getAppoinment = await getAllappoinmentService();
    apiResponse.success(
      res,
      getAppoinment,
      'Appoinment fetch successfully',
      201
    );
  }
);

export { createAppoinmentController, getAppoinmentController };
