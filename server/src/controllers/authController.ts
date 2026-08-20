import { Request, Response, NextFunction } from 'express';
import { registerUser } from '@src/services/authService';
import apiResponse from '@src/utils/apiResponse';

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await registerUser(req.body);
    apiResponse.success(res, user, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export { register };
