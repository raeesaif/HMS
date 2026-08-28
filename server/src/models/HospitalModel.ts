import { model, models, Schema, type InferSchemaType } from 'mongoose';

const HospitalSchema = new Schema(
  {
    hospitalName: {
      type: String,
      required: [true, 'Hospital Name is required'],
      trim: true,
    },

    hospitalCode: {
      type: String,
      required: [true, 'Hospital Code is required'],
      unique: true,
      trim: true,
    },
    hospitalEmail: {
      type: String,
      required: [true, 'Hospital Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    hospitalPhone: {
      type: String,
      required: [true, 'Hospital Phone Number is required'],
      unique: true,
      trim: true,
    },

    address: {
      addressLine1: String,
      addressLine2: String,
      city: {
        type: String,
        required: true,
      },
      state: String,
      country: {
        type: String,
        required: true,
      },
      postalCode: String,
    },

    status: {
      type: String,
      enum: ['trial', 'active', 'inactive', 'suspended', 'expired'],
      default: 'trial',
    },

    trialEndsAt: {
      type: Date,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

type HospitalType = InferSchemaType<typeof HospitalSchema>;

const HospitalModel =
  models.Hospital || model<HospitalType>('Hospital', HospitalSchema);

export default HospitalModel;

export type { HospitalType };
