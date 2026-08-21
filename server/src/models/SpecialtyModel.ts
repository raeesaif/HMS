import { model, models, Schema, type InferSchemaType } from 'mongoose';

const SpecialtySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Specialty name is required'],
      unique: true,
      trim: true,
      minLength: [2, 'Specialty name must be at least 2 characters'],
      maxLength: [100, 'Specialty name must be at most 100 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxLength: [500, 'Description cannot exceed 500 characters'],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

type SpecialtyType = InferSchemaType<typeof SpecialtySchema>;

const SpecialtyModel =
  models.Specialty || model<SpecialtyType>('Specialty', SpecialtySchema);

export default SpecialtyModel;

export type { SpecialtyType };
