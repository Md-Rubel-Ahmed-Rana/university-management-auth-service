import { Model, Types } from 'mongoose';

export type IAdmin = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  managementDepartment: Types.ObjectId;
  profileImage: string;
};

export type IAdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilter = {
  searchTerm: string;
};
