import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationOptionsType } from '../../../interfaces/pagination';
import { adminSearchableFields } from './admin.constants';
import { IAdmin, IAdminFilter } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmins = async (
  filters: IAdminFilter,
  paginationOptions: paginationOptionsType
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
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
  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment');
  return result;
};

// const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
//   const result = await Faculty.findByIdAndDelete(id)
//     .populate('academicDepartment')
//     .populate('academicFaculty');
//   return result;
// };
const updateAdmin = async (
  id: string,
  updatedData: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndUpdate(id, updatedData, {
    new: true,
  }).populate('managementDepartment');
  return result;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
};
