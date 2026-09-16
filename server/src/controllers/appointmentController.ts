import {
  CreateAppoinmentService,
  getAllappoinmentService,
  getAvailableSlotsService,
  deleteAppoinmentService,
  cancelAppoinmentService,
} from '@src/services/appointmentService';
import apiResponse from '@src/utils/apiResponse';
import AppError from '@src/utils/appError';
import catchAsync from '@src/utils/catchAsync';
import { Request, Response } from 'express';

const createAppoinmentController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const createdBy = (req as any).user?._id;
    const appoinment = await CreateAppoinmentService(req.body, createdBy);
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

const getAvailableSlotsController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { doctor, date } = req.query;

    if (typeof doctor !== 'string' || typeof date !== 'string') {
      throw new AppError(400, 'Doctor and date are required');
    }

    const slots = await getAvailableSlotsService(doctor, date);
    apiResponse.success(
      res,
      slots,
      'Available slots fetched successfully',
      200
    );
  }
);

const cancelAppoinmentController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const appoinment = await cancelAppoinmentService(
      String(req.params.id),
      req.body.cancelreason
    );
    apiResponse.success(
      res,
      appoinment,
      'Appoinment cancelled successfully',
      200
    );
  }
);


const deleteAppoinmentController = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      await deleteAppoinmentService(String(req.params.id));
      apiResponse.success(res, null, 'Appoinment deleted successfully', 200);
    }
)



export {
  createAppoinmentController,
  getAppoinmentController,
  getAvailableSlotsController,
  cancelAppoinmentController,
  deleteAppoinmentController
};
