import { model, models, Schema, type InferSchemaType } from 'mongoose';

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      unique: true,
      trim: true,
      minLength: [2, 'Department name must be at least 2 characters'],
      maxLength: [50, 'Department name must be at most 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, 'Department description must be at most 500 characters'],
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

type DepartmentType = InferSchemaType<typeof DepartmentSchema>;

const DepartmentModel =
  models.Department || model<DepartmentType>('Department', DepartmentSchema);

export default DepartmentModel;

export type { DepartmentType };
