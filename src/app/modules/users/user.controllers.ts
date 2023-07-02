import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/SendResponse';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.services';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.createUser(req.body);
      const resData = {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully!',
        data: result,
      };
      sendResponse(res, resData);
    } catch (error) {
      next(error);
    }
  }
);

export const UserController = {
  createUser,
};
