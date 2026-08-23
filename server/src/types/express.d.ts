import type { HydratedDocument } from 'mongoose';
import type { UserType } from '@src/models/UserModel';

declare global {
  namespace Express {
    interface Request {
      user?: HydratedDocument<UserType>;
    }
  }
}

export {};
