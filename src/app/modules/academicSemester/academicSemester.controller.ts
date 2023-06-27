import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicSemesterService.createSemester(req.body);
    next();
    const resData = {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully!',
      data: result,
    };
    sendResponse(res, resData);
  }
);

export const AcademicSemesterController = {
  createSemester,
};
