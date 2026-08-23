import { Request, Response, NextFunction } from 'express';
import { registerUser, loginService } from '@src/services/authService';
import apiResponse from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';
import sanitizeUser from '@src/utils/sanitizeUser';
import AppError from '@src/utils/appError';

const register = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = await registerUser(req.body);
    apiResponse.success(res, user, 'User created successfully', 201);
  }
);

const login = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await loginService(req.body);
    apiResponse.success(res, result, 'Login successful', 200);
  }
);

const meController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError(401, 'You are not logged in! Please log in to get access.');
    }
    apiResponse.success(res, sanitizeUser(req.user), 'User fetched successfully', 200);
  }
);


export { register ,login,meController};
