import { Model, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export type UserInterface = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<UserInterface, Record<string, unknown>>;
