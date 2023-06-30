import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationOptionsType } from '../../../interfaces/pagination';
import { academicSemesterTitleCodeMapper } from './academicSemester.constants';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  filters: IAcademicSemesterFilter,
  paginationOptions: paginationOptionsType
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters;

  const searchableFields = ['title', 'code', 'year'];
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

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
  const result = await AcademicSemester.find({ $and: andCondition })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
};
