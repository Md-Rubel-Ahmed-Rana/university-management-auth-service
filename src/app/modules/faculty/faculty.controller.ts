import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import { FacultyService } from './faculty.service';

const getAllFaculties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await FacultyService.getAllFaculties();
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
const deletdFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await FacultyService.deletdFaculty(id);
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

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  deletdFaculty,
};
