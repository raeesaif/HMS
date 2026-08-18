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

const UserSchema = new Schema(
  {
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
    specialty: {
      type: String,
      enum: {
        values: Object.values(Specialty),
        message:
          'Specialty must be one of: ' + Object.values(Specialty).join(', '),
      },
      required: function (this: { role: string }): boolean {
        return this.role === Role.Doctor;
      },
    },
    experience: {
      type: Number,
      required: function (this: { role: string }): boolean {
        return this.role === Role.Doctor;
      },
    },
    qualification: {
      type: String,
      required: function (this: { role: string }): boolean {
        return this.role === Role.Doctor;
      },
    },
    licenseNumber: {
      type: String,
      unique: true,
      sparse: true,
      required: function (this: { role: string }): boolean {
        return this.role === Role.Doctor;
      },
    },
    bio: {
      type: String,
      trim: true,
      maxLength: [200, 'Bio cannot exceed 200 characters'],
      required: function (this: { role: string }): boolean {
        return this.role === Role.Doctor;
      },
    },
    verificationTokenHash: {
      type: String,
      select: false,
    },

    verificationTokenExpiry: {
      type: Date,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshTokenHash: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

type UserType = InferSchemaType<typeof UserSchema>;
const UserModel = models.User || model<UserType>('User', UserSchema);
export default UserModel;
export type { UserType };
export { Role, Specialty };
