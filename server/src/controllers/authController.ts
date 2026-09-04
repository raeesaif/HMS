import { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginService,
  updateDutyStatus,
  updateAvailabilityStatus,
  updatePassword
} from '@src/services/authService';
import apiResponse from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import sanitizeUser from '@src/utils/sanitizeUser';
import AppError from '@src/utils/appError';
import UserModel from '@src/models/UserModel';
import { Role } from '@src/models/UserModel';

const register = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const hospitalId = (req as any).user?.hospitalId;
    const user = await registerUser({
      ...req.body,
      ...(hospitalId && { hospitalId: String(hospitalId) }),
    });
    apiResponse.success(res, user, 'User created successfully', 201);
  }
);

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const result = await loginService(req.body);
  apiResponse.success(res, result, 'Login successful', 200);
});

const meController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError(
        401,
        'You are not logged in! Please log in to get access.'
      );
    }
    apiResponse.success(
      res,
      sanitizeUser(req.user),
      'User fetched successfully',
      200
    );
  }
);

const updateDutyStatusController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError(
        401,
        'You are not logged in! Please log in to get access.'
      );
    }
    const user = await updateDutyStatus(
      String(req.user._id),
      req.body.dutyStatus
    );
    apiResponse.success(res, user, 'Duty status updated successfully', 200);
  }
);

const updateAvailabilityStatusController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError(
        401,
        'You are not logged in! Please log in to get access.'
      );
    }
    const user = await updateAvailabilityStatus(
      String(req.user._id),
      req.body.availabilityStatus
    );
    apiResponse.success(
      res,
      user,
      'Availability status updated successfully',
      200
    );
  }
);

const getDoctorsController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const hospitalId = (req as any).user?.hospitalId;
    const { department } = req.query;
    const filter: any = { role: Role.Doctor, hospitalId };
    if (department) filter.department = department;
    const doctors = await UserModel.find(filter).select(
      '_id firstName lastName userId'
    );
    apiResponse.success(res, doctors, 'Doctors fetched successfully', 200);
  }
);

const getPatientController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const hospitalId = (req as any).user?.hospitalId;
    const filter: any = { role: Role.Patient, hospitalId };

    const patient = await UserModel.find(filter);
    apiResponse.success(res, patient, 'Patient fetched successfully', 200);
  }
);

const getNurseController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const hospitalId = (req as any).user?.hospitalId;
    const filter: any = { role: Role.Nurse, hospitalId };
    const nurse = await UserModel.find(filter);
    apiResponse.success(res, nurse, 'Nurse fetched successfully', 200);
  }
);

const getReceptionistController = catchAsync(
  async(req:Request, res:Response):Promise<void>=>{
    const hospitalId = (req as any).user?.hospitalId;
    const filter:any = {role:Role.Receptionist, hospitalId};
    const receptionist = await UserModel.find(filter);
    apiResponse.success(res, receptionist, 'Receptionist fetched successfully', 200);
  }
)

const updatePasswordController = catchAsync(
  async(req:Request,res:Response):Promise<void>=>{
    const password = await updatePassword(String(req.user?._id), req.body.currentPassword, req.body.newPassword);
    apiResponse.success(res, password, 'Password updated successfully', 200);
  }
)

export {
  register,
  login,
  meController,
  updateDutyStatusController,
  updateAvailabilityStatusController,
  updatePasswordController,
  getDoctorsController,
  getPatientController,
  getNurseController,
  getReceptionistController

};
