import { SortOrder } from 'mongoose';
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
const updateStudent = async (id: string, updatedData: Partial<IStudent>) => {
  const result = await Student.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });
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
