import UserModel from '@src/models/UserModel';
import { hashPassword } from '@src/utils/helper';
type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  specialty?: string;
  experience?: number;
  qualification?: string;
  bio?: string;
};

const registerUser = async (userData: RegisterUserData) => {
  const existingUser = await UserModel.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error('user with this email already exists');
  }

  const hashedPassword = await hashPassword(userData.password);
};
 