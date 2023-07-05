import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.services';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { student, ...userData } = req.body;
      const result = await UserService.createStudent(student, userData);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

export const UserController = {
  createStudent,
};
