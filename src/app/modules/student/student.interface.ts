import { Model, Types } from 'mongoose';

type UsetName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: UsetName;
  dateOfBirth: string;
  gender: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  academicFaculty: Types.ObjectId; // | IAcademicFaculty;
  academicDepartment: Types.ObjectId; // | IAcademicDepartment;
  academicSemester: Types.ObjectId; // | IAcademicSemester;
};
export type IStudentModel = Model<IStudent, Record<string, unknown>>;
