import users from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verificationEmailTemplate from '../emails/VerificationEmail.js';
import { randomBytes } from 'crypto';
import sendEmail from '../utils/sendEmail.js';

const registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = randomBytes(32).toString('hex');

    await users.create({ firstname, lastname, email, password: hashedPassword, verificationToken });

    const verificationTokenUrl = `http://localhost:5000/api/auth/verify-email?token=${verificationToken}&email=${email}`;
    await sendEmail(email, 'Verify your email', verificationEmailTemplate(firstname, verificationTokenUrl));

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { token, email } = req.query;
  try {
    const user = await users.findOne({ email, verificationToken: token });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid token or email' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: 'Please verify your email before logging in' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, verifyEmail, loginUser };
