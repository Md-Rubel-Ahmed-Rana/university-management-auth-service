import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { pagination } from '../../../constants/pagination';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicSemesterService.createSemester(req.body);
    const resData = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully!',
      data: result,
    };
    sendResponse(res, resData);
    next();
  }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, pagination);
  const result = await AcademicSemesterService.getAllSemester(
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
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
