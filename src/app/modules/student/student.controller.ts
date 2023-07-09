/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { pagination } from '../../../constants/pagination';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constants';
import { StudentService } from './student.service';

const getAllStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationOptions = pick(req.query, pagination);
      const filters: any = pick(req.query, studentFilterableFields);
      const result = await StudentService.getAllStudent(
        filters,
        paginationOptions
      );
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students found!',
        meta: result.meta,
        data: result.data,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await StudentService.getSingleStudent(id);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student found!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await StudentService.updateStudent(id, updatedData);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student updated successfully!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);
const deleteStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await StudentService.deleteStudent(id);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student deleted successfully!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
