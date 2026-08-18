import { model, models, Schema, type InferSchemaType } from 'mongoose';

enum Role {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  Doctor = 'doctor',
  Nurse = 'nurse',
  Receptionist = 'receptionist',
  Patient = 'patient',
}

enum Specialty {
  Cardiology = 'cardiology',
  Neurology = 'neurology',
  Orthopedics = 'orthopedics',
  Dermatology = 'dermatology',
  Pediatrics = 'pediatrics',
  General_Medicine = 'general_medicine',
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minLength: [3, 'First name must be at least 3 characters'],
    maxLength: [50, 'First name must be at most 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minLength: [3, 'Last name must be at least 3 characters'],
    maxLength: [50, 'Last name must be at most 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: {
      values: Object.values(Role),
      message: 'Role must be one of: ' + Object.values(Role).join(', '),
    },
    default: Role.Patient,
    required: [true, 'Role is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
