/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { pagination } from '../../../constants/pagination';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { filterableFields } from './academicSemester.constants';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AcademicSemesterService.createSemester(req.body);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester created successfully!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationOptions = pick(req.query, pagination);
      const filters: any = pick(req.query, filterableFields);
      const result = await AcademicSemesterService.getAllSemester(
        filters,
        paginationOptions
      );
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semesters found!',
        meta: result.meta,
        data: result.data,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await AcademicSemesterService.getSingleSemester(id);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester found!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

const updateSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await AcademicSemesterService.updateSemester(
        id,
        updatedData
      );
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester updated!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

const deleteSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await AcademicSemesterService.deleteSemester(id);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester deleted successfully!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
