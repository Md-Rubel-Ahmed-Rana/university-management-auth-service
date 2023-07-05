/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationOptionsType } from '../../../interfaces/pagination';
import { studentSearchableFields } from './student.constants';
import { IStudent, IStudentFilter } from './student.interface';
import { Student } from './student.model';

const getAllStudent = async (
  filters: IStudentFilter,
  paginationOptions: paginationOptionsType
): Promise<IGenericResponse<IStudent[]>> => {
  // dynamic searching
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // filtering
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination
  const {
    page = 1,
    limit = 10,
    skip = 0,
    sortBy,
    sortOrder,
  } = paginationHelper.calculatePagination(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // retrieving data
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ _id: id })
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment');
  return result;
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  const isExist = await Student.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updateStudentData = { ...studentData };

  // update name dynamically
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  // update guardian dynamically
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const gurdianKey = `guardian.${key}`;
      (updateStudentData as any)[gurdianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  // update localGuardian dynamically
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `guardian.${key}`;
      (updateStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate(
    { _id: id },
    updateStudentData,
    {
      new: true,
    }
  );
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await Student.findOneAndDelete({ _id: id })
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment');
  return result;
};

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
