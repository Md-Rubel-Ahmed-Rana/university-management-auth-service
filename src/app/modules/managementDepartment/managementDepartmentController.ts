import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result =
        await ManagementDepartmentService.createManagementDepartment(req.body);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'ManagementDepartment created successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);
const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result =
        await ManagementDepartmentService.getAllManagementDepartments();
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'ManagementDepartments retrieved successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);
const getSinglelManagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result =
        await ManagementDepartmentService.getSinglelManagementDepartment(
          req.params.id
        );
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'ManagementDepartment retrieved successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result =
        await ManagementDepartmentService.updateManagementDepartment(
          req.params.id,
          req.body
        );
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'ManagementDepartment updated successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSinglelManagementDepartment,
  updateManagementDepartment,
};
