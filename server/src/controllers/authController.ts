import { Request, Response, NextFunction } from 'express';
import { registerUser, loginService } from '@src/services/authService';
import apiResponse from '@src/utils/apiResponse';
import catchAsync from '@src/utils/catchAsync';

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


export { register ,login};
