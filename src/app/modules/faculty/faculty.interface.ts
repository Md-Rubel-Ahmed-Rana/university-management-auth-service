import { Model } from 'mongoose';

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
  academicDepartment: string;
  academicFaculty: string;
  profileImage: string;
};
export type IFacultyModel = Model<IFaculty, Record<string, unknown>>;
