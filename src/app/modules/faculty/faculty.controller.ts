/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { pagination } from '../../../constants/pagination';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constants';
import { FacultyService } from './faculty.service';

const getAllFaculties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationOptions = pick(req.query, pagination);
      const filters: any = pick(req.query, facultyFilterableFields);
      const result = await FacultyService.getAllFaculties(
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
const getSingleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await FacultyService.getSingleFaculty(id);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty retrieved successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);
const deleteFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await FacultyService.deleteFaculty(id);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty deleted successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);
const updateFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await FacultyService.updateFaculty(id, updatedData);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty updated successfully',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
