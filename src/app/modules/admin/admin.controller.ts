/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { pagination } from '../../../constants/pagination';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constants';
import { AdminService } from './admin.service';

const getAllAdmins = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationOptions = pick(req.query, pagination);
      const filters: any = pick(req.query, adminFilterableFields);
      const result = await AdminService.getAllAdmins(
        filters,
        paginationOptions
      );
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties retrieved successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);
const getSingleAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AdminService.getSingleAdmin(req.params.id);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin retrieved successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);
const updateAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await AdminService.updateAdmin(id, updatedData);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin updated successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
};
