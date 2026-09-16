import { model, models, Schema, Types, InferSchemaType } from 'mongoose';

const appointmentSchema = new Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
    },
    patient: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hospital: {
      type: Types.ObjectId,
      ref: 'Hospital',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appoinmentTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ['scheduled', 'confirmed', 'cancelled', 'rejected', 'completed'],
      default: 'scheduled',
    },
    priority: {
      type: String,
      enum: ['normal', 'urgent', 'emergency'],
    },
    department: {
      type: Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    appoinmentType: {
      type: String,
      enum: [
        'follow-up',
        'newPaitent',
        'consultation',
        'check-up',
        'procedure',
      ],
    },
    cancelreason: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

type AppoinmentType = InferSchemaType<typeof appointmentSchema>;

const appoinmentModel =
  models.appoinment || model<AppoinmentType>('appoinment', appointmentSchema);

export default appoinmentModel;

export type { AppoinmentType };
