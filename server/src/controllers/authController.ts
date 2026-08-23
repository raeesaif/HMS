import { Request, Response, NextFunction } from 'express';
import { registerUser } from '@src/services/authService';
import apiResponse from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

const register = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = await registerUser(req.body);
    apiResponse.success(res, user, 'User created successfully', 201);
  }
);

export { register };
