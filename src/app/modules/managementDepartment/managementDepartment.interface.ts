import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};

export type IManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;
