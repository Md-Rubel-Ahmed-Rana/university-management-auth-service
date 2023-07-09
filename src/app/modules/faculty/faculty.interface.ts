import { Model, Types } from 'mongoose';

export type IFaculty = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName: string;
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
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  profileImage: string;
};
export type IFacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilter = {
  searchTerm: string;
};
