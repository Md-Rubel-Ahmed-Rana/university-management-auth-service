import { Schema, model } from 'mongoose';
import {
  IManagementDepartment,
  IManagementDepartmentModel,
} from './managementDepartment.interface';

const ManagementDepartmentSchema = new Schema<
  IManagementDepartment,
  IManagementDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ManagementDepartment = model<
  IManagementDepartment,
  IManagementDepartmentModel
>('ManagementDepartment', ManagementDepartmentSchema);
