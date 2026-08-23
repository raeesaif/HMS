import { model, models, Schema, type InferSchemaType } from 'mongoose';

enum Role {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  Doctor = 'doctor',
  Nurse = 'nurse',
  Receptionist = 'receptionist',
  Patient = 'patient',
}

const UserSchema = new Schema(
  {
    // =========================
    // Basic Information
    // =========================

    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minLength: [2, 'First name must be at least 2 characters'],
      maxLength: [50, 'First name must be at most 50 characters'],
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minLength: [2, 'Last name must be at least 2 characters'],
      maxLength: [50, 'Last name must be at most 50 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters'],
      select: false,
    },

    // =========================
    // Role & Identification
    // =========================

    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: 'Role must be one of: ' + Object.values(Role).join(', '),
      },
      required: [true, 'Role is required'],
      default: Role.Patient,
    },

    userId: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },

    // =========================
    // Department & Specialty
    // =========================

    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },

    specialty: {
      type: Schema.Types.ObjectId,
      ref: 'Specialty',
    },

    // =========================
    // Doctor / Nurse Information
    // =========================

    licenseNumber: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    qualification: {
      type: String,
      trim: true,
    },

    experience: {
      type: Number,
      min: [0, 'Experience cannot be negative'],
    },

    // =========================
    // Shift Information
    // =========================

    shiftStart: {
      type: String,
      trim: true,
    },

    shiftEnd: {
      type: String,
      trim: true,
    },

    isOnDuty: {
      type: Boolean,
      default: false,
    },

    // =========================
    // Employment Period (staff only)
    // =========================

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    // =========================
    // Patient Information
    // =========================

    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'Gender must be male or female',
      },
    },

    patientStatus: {
      type: String,
      enum: {
        values: ['stable', 'observation', 'critical', 'discharged'],
        message:
          'Patient status must be stable, observation, critical, or discharged',
      },
    },
    age: {
      type: Number,
      min: [0, 'Age cannot be negative'],
      max: [150, 'Age cannot exceed 150'],
    },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    admissionDate: {
      type: Date,
    },

    // =========================
    // Account Status
    // =========================

    isActive: {
      type: Boolean,
      default: true,
    },

    isFirstLogin: {
      type: Boolean,
      default: true,
    },

    // =========================
    // Email Verification
    // =========================

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationTokenHash: {
      type: String,
      select: false,
    },

    verificationTokenExpiry: {
      type: Date,
      select: false,
    },

    // =========================
    // Refresh Token
    // =========================

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

export { Role };
