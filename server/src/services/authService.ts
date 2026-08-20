import UserModel from '@src/models/UserModel';
import { hashPassword, generateRandomString } from '@src/utils/helper';
import sendEmail from '@src/utils/sendEmail';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const welcomeEmailTemplate = require('@src/emails/WelcomeEmail').default;

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

  const rawPassword = userData.password;
  const hashedPassword = await hashPassword(rawPassword);
  const verificationToken = generateRandomString(32);

  const user = await UserModel.create({
    ...userData,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    isVerified: false,
    verificationTokenHash: verificationToken,
  });

  const loginUrl = `${process.env.FRONTEND_URL}/login`;

  await sendEmail({
    to: user.email,
    subject: 'Welcome to HMS - Your Account is Ready',
    html: welcomeEmailTemplate(
      user.firstName,
      user.email,
      user.role,
      rawPassword,
      loginUrl
    ),
  });

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    verificationToken,
  };
};

export { registerUser };
