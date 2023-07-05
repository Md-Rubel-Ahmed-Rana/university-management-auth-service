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
  bloodGroup?: ['A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'];
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

export type IStudentFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

// const data = {
//   "name" : {
//     "firstName" : "Md Rubel",
//     "middleName" : "Ahmed",
//     "lastName" : "Rana"
//   },
//   "dateOfBirth" : "03-03-1999",
//   "gender" : "male",
//   "bloodGroup":'AB+',
//   "email": "rubel123@gmail.com",
//   "contactNo": "01758049882",
//   "emergencyContactNo": "01786263715",
//   "presentAddress": "Lombakandi, Companigonj, Sylhet",
//   "permanentAddress": "Lombakandi, Companigonj, Sylhet",
//   "guardian": {
//     "fatherName": "Mohammad Ali",
//     "fatherOccupation": "farmer",
//     "fatherContactNo": "019594565465",
//     "motherName": "Fahmida",
//     "motherOccupation": "housewife",
//     "motherContactNo": "01758213659",
//     "address": "Lombakandi, Companigonj, Sylhet",
//   },
//   "localGuardian": {
//     "name": "Rofik",
//     "occupation": "Driver",
//     "contactNo": "01705137384",
//     "address": "Lombakandi, Companigonj, Sylhet",
//   },
//   "profileImage": "image.png",
//   "academicFaculty": "64a4627ceb41b6b4dbafbf42",
//   "academicDepartment": "64a462aceb41b6b4dbafbf44",
//   "academicSemester": "64a45f5cacd103e5df80cc1c"
// }
